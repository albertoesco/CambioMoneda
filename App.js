import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import ExchangeCard from './ExchangeCard';
import InsertExchange from './InsertExchange';

const currencies = {
  "USD": {
    "id": 0,
    "emoji": "🇺🇸",
    "exchangeRate": 1,
    "name": "US Dollar"
  },
  "EUR": {
    "id": 1,
    "emoji": "🇪🇺",
    "exchangeRate": 0.89,
    "name": "Euro"
  },
  "JPY": {
    "id": 2,
    "emoji": "🇯🇵",
    "exchangeRate": 114.42,
    "name": "Japanese Yen"
  },
  "GBP": {
    "id": 3,
    "emoji": "🇬🇧",
    "exchangeRate": 0.75,
    "name": "British Pound"
  },
  "AUD": {
    "id": 4,
    "emoji": "🇦🇺",
    "exchangeRate": 1.35,
    "name": "Australian Dollar"
  },
  "CAD": {
    "id": 5,
    "emoji": "🇨🇦",
    "exchangeRate": 1.28,
    "name": "Canadian Dollar"
  },
  "CHF": {
    "id": 6,
    "emoji": "🇨🇭",
    "exchangeRate": 0.93,
    "name": "Swiss Franc"
  },
  "CNY": {
    "id": 7,
    "emoji": "🇨🇳",
    "exchangeRate": 6.36,
    "name": "Chinese Yuan"
  },
  "SEK": {
    "id": 8,
    "emoji": "🇸🇪",
    "exchangeRate": 8.51,
    "name": "Swedish Krona"
  },
  "NZD": {
    "id": 9,
    "emoji": "🇳🇿",
    "exchangeRate": 1.49,
    "name": "New Zealand Dollar"
  },
  "INR": {
    "id": 10,
    "emoji": "🇮🇳",
    "exchangeRate": 74.57,
    "name": "Indian Rupee"
  },
  "BRL": {
    "id": 11,
    "emoji": "🇧🇷",
    "exchangeRate": 5.22,
    "name": "Brazilian Real"
  },
  "RUB": {
    "id": 12,
    "emoji": "🇷🇺",
    "exchangeRate": 73.96,
    "name": "Russian Ruble"
  },
  "ZAR": {
    "id": 13,
    "emoji": "🇿🇦",
    "exchangeRate": 16.96,
    "name": "South African Rand"
  },
  "MXN": {
    "id": 14,
    "emoji": "🇲🇽",
    "exchangeRate": 20.45,
    "name": "Mexican Peso"
  }
};

const App = () => {
  const [showInsertExchange, setShowInsertExchange] = useState(false);
  const [exchanges, setExchanges] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [amount, setAmount] = useState(0);

  // Nuevo Exchange
  const addExchangeHandler = (newExchange) => {
    setExchanges([...exchanges, newExchange]);
    setShowInsertExchange(false);
  };

  // Borrar Exchange
  const deleteExchangeHandler = (idexchange) => {
    const updatedExchanges = exchanges.filter((exchange) => exchange.id !== idexchange);
    setExchanges(updatedExchanges);
  };

  // Conversión de moneda
  const convertCurrency = () => {
    if (!selectedCurrency) {
      alert('Selecciona una moneda');
      return;
    }

    const exchangeRate = currencies[selectedCurrency].exchangeRate;
    const result = amount * exchangeRate;

    alert(`${amount} ${selectedCurrency} equivale a ${result.toFixed(2)} ${selectedCurrency}`);
  };

  const headerContent = (
    <View style={styles.header}>
      <Image style={styles.headerImage} source={require('./CambioMoneda/assets/img/inicio.png')} />
      <Text style={styles.headerText}>Currency Exchanger</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {headerContent}
      
      {/* Nueva sección para la conversión */}
      <View style={styles.conversionSection}>
        <TextInput
          style={styles.input}
          placeholder="Cantidad a convertir"
          keyboardType="numeric"
          value={amount.toString()}
          onChangeText={(text) => setAmount(parseFloat(text))}
        />

        <Picker
          selectedValue={selectedCurrency}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
        >
          <Picker.Item label="Selecciona una moneda" value="" />
          {Object.keys(currencies).map((currencyCode) => (
            <Picker.Item key={currencyCode} label={currencies[currencyCode].name} value={currencyCode} />
          ))}
        </Picker>

        <TouchableOpacity style={styles.convertButton} onPress={convertCurrency}>
          <Text style={styles.convertButtonText}>Convertir</Text>
        </TouchableOpacity>
      </View>

      {/* Mostrar elementos */}
      <FlatList
        data={exchanges}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExchangeCard
            exchange={item}
            onDelete={() => deleteExchangeHandler(item.id)}
          />
        )}
      />

      {/* Agregar intercambio */}
      <Modal visible={showInsertExchange} animationType="slide">
        <InsertExchange
          currencies={currencies}
          onCancel={() => setShowInsertExchange(false)}
          onAddExchange={(newExchange) => addExchangeHandler(newExchange)}
          onSelectCurrency={setSelectedCurrency}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  conversionSection: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  convertButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  convertButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;