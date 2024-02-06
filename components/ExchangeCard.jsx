import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ExchangeCard = ({ exchange, onDelete }) => {
  if (!exchange) {
    return null;
  }

  return (
    <View style={styles.general}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.emojiContainer}>
            <View>
              <Text style={styles.content}>{exchange.originCurrency}</Text>
              <Text style={styles.emoji}>{exchange.emojiFrom}</Text>
              <Text style={styles.content}>{exchange.originAmount}</Text>
            </View>
            <Image source={require('../assets/images/uil_arrows-h.png')} style={styles.imageStyle} />
            <View>
              <Text style={styles.content}>{exchange.destCurrency}</Text>
              <Text style={styles.emoji}>{exchange.emojiTo}</Text>
              <Text style={styles.content}>{exchange.destAmount}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
            <Image source={require('../assets/images/lets-icons_remove.png')} style={styles.deleteStyle} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    marginVertical: 1,
  },
  card: {
    width: 345,
    height: 142,
    marginTop: 70,
    marginLeft: 23,
    backgroundColor: "#d3e09d",
    borderRadius: 13,
    padding: 16,
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  imageStyle: {
    width: 125,
  },
  emoji: {
    fontSize: 20,
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
    position: 'absolute',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  deleteText: {
    color: 'white',
    fontSize: 14,
  },
  deleteStyle: {
    position: 'relative',
    marginTop: 0
  }
});

export default ExchangeCard;
