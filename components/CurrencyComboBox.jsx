import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { View, StyleSheet } from 'react-native';

const CurrencyComboBox = ({ currencies, onSelectCurrency }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(Object.keys(currencies)[0])

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency)
    onSelectCurrency(currency)
  }

  return (
    <View style={styles.ComboBox}>
      <RNPickerSelect style={StyleSheet.picket}
        onValueChange={handleCurrencyChange}
        items={Object.keys(currencies).map((currencyCode) => ({
          label: `${currencies[currencyCode].emoji} ${currencies[currencyCode].name}`,
          value: currencyCode,
        }))}
      />
    </View>
  )
  {/*return (
    <View style={[styles.comboBox, style]}>
      <Picker
        style={pickerStyles.picker}
        selectedValue={selectedCurrency}
        onValueChange={handleCurrencyChange}
      >
        <Picker.Item label="Select Currency" value={null} />
        {Object.keys(currencies).map((currencyCode) => (
          <Picker.Item
            key={currencyCode}
            label={`${currencies[currencyCode].emoji} ${currencies[currencyCode].name}`}
            value={currencyCode}
          />
        ))}
      </Picker>
    </View>
  );
};*/}
}
const styles = StyleSheet.create({
  ComboBox: {
    backgroundColor: "#d27c2b",
    borderRadius: 15,
    width: "100%",
  },
});

export default CurrencyComboBox