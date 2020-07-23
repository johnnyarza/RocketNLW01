import React, { useEffect, useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUFResponse {
  sigla: string;
}
interface IBGECityResponse {
  nome: string;
}

export default function Home() {
  const navigation = useNavigation();

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [uf, setUf] = useState('0');
  const [city, setCity] = useState('0');

  useEffect(() => {
    const getUf = async () => {
      const res = await axios.get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      );
      const data = res.data;
      const ufInitials = data.map((uf) => uf.sigla);
      setUfs(ufInitials);
    };
    getUf();
  }, []);

  useEffect(() => {
    if (uf === '0') return;
    const getCities = async () => {
      const res = await axios.get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      );
      const data = res.data;
      const cityNames = data.map((city) => city.nome);
      setCities(cityNames);
    };
    getCities();
  }, [uf]);

  const handleSelectUf = (value: string) => {
    setUf(value);
  };

  const handleSelectCity = (value: string) => {
    setCity(value);
  };

  const handleNavigateToPoints = () => {
    navigation.navigate('Points', {
      uf,
      city,
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/home-background.png')}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </Text>
      </View>
      <View style={styles.footer}>
        <View style={{ paddingBottom: 30 }}>
          <View style={styles.rnSelectPicker}>
            <RNPickerSelect
              placeholder={{ label: 'Selecione UF' }}
              onValueChange={handleSelectUf}
              items={ufs.sort().map((uf) => ({ label: uf, value: uf }))}
            />
          </View>
          <View style={styles.rnSelectPicker}>
            <RNPickerSelect
              placeholder={{ label: 'Selecione a Cidade' }}
              onValueChange={cities && handleSelectCity}
              items={
                cities &&
                cities.sort().map((city) => ({ label: city, value: city }))
              }
            />
          </View>
        </View>
        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" color="#FFF" size={24} />
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
  rnSelectPicker: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
  },
});
