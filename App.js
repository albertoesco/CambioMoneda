import { Image } from 'react-native';
import FlatList from 'react-native-flatlist-data';
import ExchangeCard from './ExchangeCard';
import Modal from 'react-native-modal';
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

  //Nuevo Exchange
  const AddExchangeHandler = (newExchange) => {
    setExchanges([...exchanges, newExchange]);
    setShowInsertExchange(false);
  };

  //Borrar Exchange
  const DeleteExchangeHandler = (idexchange) => {
    const updatedExchanges = exchanges.filter((exchange) => exchange.id !== idexchange);
    setExchanges(updatedExchanges);
  };

  const HeaderContent = (
    <View style={styles.header}>
      <Image style={styles.headerImage} source={require('./CambioMoneda/assets/img/inicio.png')} />
      <Text style={styles.headerText}>Currency Exchanger</Text>
    </View>
  );

  return (
    <View style={container}>
      {headerContent}
      <Text>Selected Currency {selectedCurrency}</Text>

      {/*Mostrar elementos*/}
      <FlatList
        data={exchanges}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <ExchangeCard
              exchange={item}
              onDelete={() => DeleteExchangeHandler(item.id)}
            />
          );
        }}
      />

      {/*Agregar intercambio*/}
      <Modal visible={showInsertExchange} animationType="slide">

        <InsertExchange
          currencies={currencies}
          onCancel={() => setShowInsertExchange(false)}
          onAddExchange={(newExchange) => AddExchangeHandler(newExchange)}
          onSelectCurrency={setSelectedCurrency}
        />
      </Modal>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
