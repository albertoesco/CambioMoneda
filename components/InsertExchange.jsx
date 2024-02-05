import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
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
      emojiTo: currencies[toCurrency].emoji,
      emojiFrom: currencies[fromCurrency].emoji,
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
      <Image source={require('../assets/images/clarity_dollar-solid.png')} style={styles.imageStyleDollar} />

      <View style={styles.viewcont}>
        <Text>Origin currency:</Text>
        <CurrencyComboBox style={styles.originComboBox}
          currencies={currencies}
          selectedCurrency={fromCurrency}
          onSelectCurrency={(currency) => setFromCurrency(currency)}
        />
        <View>
          <Text>Amount:</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={(text) => setAmount(text)}
            keyboardType="Numeric"
            placeholder="Enter amount"
            placeholderTextColor="#999"
          />
        </View>
        <Image source={require('../assets/images/maki_arrow.png')} style={styles.imageStyle} />
        <Text>Destination currency:</Text>
        <CurrencyComboBox
          currencies={currencies}
          selectedCurrency={toCurrency}
          onSelectCurrency={(currency) => setToCurrency(currency)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={AddExchangeHandler}>
            <Text style={styles.textButton}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onCancel}>
            <Text style={styles.textButton}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffee1',
    textDecorationColor: '#d27c2c'
  },
  viewcont: {
    width: "90%",
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d27c2c',
    padding: 8,
    marginVertical: 5,
    width: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: '#d27c2c',
    borderRadius: 5,
    marginRight: 5,
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
  },
  imageStyle: {
    marginTop: 20,
    marginBottom: 20
  },
  imageStyleDollar: {
    marginBottom: 30
  },
  originComboBox: {
    width: 264,
    height: 45,
    margintop: 299,
    marginleft: 64,
    borderradius: 12,
    border: 1,
    borderBlockColor: '#d27c2c'
  },

});

export default InsertExchange;