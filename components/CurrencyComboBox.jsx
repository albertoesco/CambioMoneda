import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

const CurrencyComboBox = ({ currencies, onSelectCurrency }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(Object.keys(currencies)[0]);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    onSelectCurrency(currency);
  };

  return (
    <Picker
      selectedValue={selectedCurrency}
      onValueChange={(itemValue) => handleCurrencyChange(itemValue)}
    >
      {Object.keys(currencies).map((currencyCode) => (
        <Picker.Item
          key={currencyCode}
          label={`${currencies[currencyCode].emoji} ${currencies[currencyCode].name}`}
          value={currencyCode}
        />
      ))}
    </Picker>
  );
};

export default CurrencyComboBox;