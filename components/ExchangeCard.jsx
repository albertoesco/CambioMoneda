import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ExchangeCard = ({ exchange, onDelete }) => {
  if (!exchange) {
    return null;
  }
  console.log(exchange)
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>{exchange.emojiTo}</Text>
        <Text style={styles.content}>{exchange.originCurrency}</Text>

        <Text style={styles.text}>Dest Currency:</Text>
        <Text style={styles.content}>{exchange.destCurrency}</Text>

        <Text style={styles.text}>Origin Amount:</Text>
        <Text style={styles.content}>{exchange.originAmount}</Text>

        <Text style={styles.text}>Dest Amount:</Text>
        <Text style={styles.content}>{exchange.destAmount}</Text>
      </View>

      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ExchangeCard;