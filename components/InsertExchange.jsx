import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import CurrencyComboBox from './CurrencyComboBox';

//Consts and Props
const InsertExchange = ({ currencies, onAddExchange, onCancel }) => {
  const [fromCurrency, setFromCurrency] = useState(Object.keys(currencies)[0]);
  const [toCurrency, setToCurrency] = useState(Object.keys(currencies)[1]);
  const [amount, setAmount] = useState('');

  const AddExchangeHandler = () => {
    if (!amount) {
      return;
    }

    //Conversion
    const conversionResult = convertCurrency(amount, fromCurrency, toCurrency, currencies);

    //Nuevo Exchange
    onAddExchange({
      id: Date.now(),
      emojiTo:currencies[toCurrency].emoji,
      emojiFrom:currencies[fromCurrency].emoji,
      originCurrency: fromCurrency,
      destCurrency: toCurrency,
      originAmount: parseFloat(amount),
      destAmount: conversionResult,
    });
    onCancel();
  };

  const convertCurrency = (amount, fromCurrency, toCurrency) => {
    if (typeof currencies !== 'object' || currencies === null) {
      console.error('El objeto currencies no está definido o no es un objeto.');
      return "Invalid Currency";
    }

    //Verificar Monedas
    if (!(fromCurrency in currencies) || !(toCurrency in currencies)) {
      console.error('Moneda no encontrada en currencies.');
      return "Invalid Currency";
    }

    //Tipos Moneda
    const exchangeRateFrom = currencies[fromCurrency].exchangeRate;
    const exchangeRateTo = currencies[toCurrency].exchangeRate;


    //Conversion Moneda
    const result = (parseFloat(amount) * exchangeRateTo) / exchangeRateFrom;

    return result.toFixed(2);
  };

  return (
    <View style={styles.modalContainer}>

      <Text>New Exchange</Text>

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
        keyboardType="Numeric"
        placeholder="Enter amount"
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={AddExchangeHandler}>
        <Text>Add and Convert</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onCancel}>
        <Text>Cancelar</Text>
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