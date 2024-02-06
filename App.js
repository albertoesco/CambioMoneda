import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import ExchangeCard from './components/ExchangeCard';
import InsertExchange from './components/InsertExchange';
import { Modal } from 'react-native';

//Podriamos mover los datos de currencies a otro archivo separado
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

  //New Exchange
  const AddExchangeHandler = (newExchange) => {
    const exchange = {
      id: exchanges.length,
      ...newExchange,
    };

    setExchanges([...exchanges, exchange]);
    setShowInsertExchange(false);
  };

  //Delete Exchange
  const DeleteExchangeHandler = (exchangeId) => {
    const updatedExchanges = exchanges.filter((exchange) => exchange.id !== exchangeId);
    setExchanges(updatedExchanges);
  };

  const headerContent = (
    <View style={styles.header}>
      <Image style={styles.headerImage} source={require('./assets/images/ep_money.png')} />
      <Text style={styles.headerText}>Currency Exchange</Text>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => setShowInsertExchange(true)}
      >
        <Image style={styles.buttonImageStyle} source={require('./assets/images/zondicons_add-outline.png')} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>{headerContent}

      {/*Otra forma de hacerlo*/}
      {/*
<FlatList
  data={state.exchanges}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <ExchangeCard exchange={item} onDelete={() => dispatch({ type: "DELETE_EXCHANGE", payload: item.id })} />
  )}
/>
  */}
      <FlatList
        data={exchanges}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <ExchangeCard exchange={item} onDelete={() => DeleteExchangeHandler(item.id)} />
          );
        }}
      />

      <Modal visible={showInsertExchange}>
        <InsertExchange
          currencies={currencies}
          onCancel={() => setShowInsertExchange(false)}
          onAddExchange={AddExchangeHandler}
          onSelectCurrency={setSelectedCurrency}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fffee1'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  buttonImageStyle: {
    width: 20,
    height: 20,
  },
  headerImage: {
    width: 128,
    height: 129,
    marginTop: 35,
    marginLeft: 21
  },
  headerText: {
    width: 174,
    height: 59,
    marginTop: 49,
    fontSize: 25,
    fontWeight: 'bold',
  },
  headerButton: {
    width: 28,
    height: 27,
    marginTop: 131,
    borderRadius: 5,
  },
});


export default App;