import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const InsertExchange = ({ currencies, onAddExchange, onCancel }) => {
  const [fromCurrency, setFromCurrency] = useState(Object.keys(currencies)[0]);
  const [toCurrency, setToCurrency] = useState(Object.keys(currencies)[1]);
  const [amount, setAmount] = useState('');

  const handleAddExchange = () => {
    if (!amount) {
      return;
    }

    const conversionResult = convertCurrency(amount, fromCurrency, toCurrency, currencies);

    onAddExchange({
      originCurrency: fromCurrency,
      destCurrency: toCurrency,
      originAmount: parseFloat(amount),
      destAmount: conversionResult,
    });

    onCancel();
  };

  const convertCurrency = (amount, fromCurrency, toCurrency, currencies) => {
    if (currencies === null || typeof currencies !== 'object') {
      console.error('El objeto currencies no está definido o no es un objeto.');
      return "Invalid Currency";
    }

    if (!(fromCurrency in currencies) || !(toCurrency in currencies)) {
      console.error('Moneda no encontrada en currencies.');
      return "Invalid Currency";
    }

    const exchangeRateFrom = currencies[fromCurrency].exchangeRate;
    const exchangeRateTo = currencies[toCurrency].exchangeRate;

    if (isNaN(exchangeRateFrom) || isNaN(exchangeRateTo) || exchangeRateFrom <= 0 || exchangeRateTo <= 0) {
      console.error('Tipos de cambio inválidos.');
      return "Invalid Exchange Rate";
    }

    const result = (parseFloat(amount) * exchangeRateTo) / exchangeRateFrom;

    return result.toFixed(2);
  };

  return (
    <View style={styles.modalContainer}>
      <Text>Add New Exchange</Text>
      <CurrencyComboBox
        currencies={currencies}
        selectedCurrency={fromCurrency}
        onSelectCurrency={(currency) => setFromCurrency(currency)}
      />
      <CurrencyComboBox
        currencies={currencies}
        selectedCurrency={toCurrency}
        onSelectCurrency={(currency) => setToCurrency(currency)}
      />
      <Text>Amount:</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType="numeric"
        placeholder="Enter amount"
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddExchange}>
        <Text>Add & Convert</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onCancel}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginVertical: 5,
    width: 200,
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginTop: 10,
  },
});

export default InsertExchange;