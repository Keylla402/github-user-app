import React, { useState } from 'react';
import { ActivityIndicator, Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Home() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchGitHubUser = async () => {
    if (!username) return;
    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      alert('Erro ao buscar usuário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Usuário GitHub</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome de usuário"
        onChangeText={setUsername}
        value={username}
      />
      <Button title="Buscar" onPress={fetchGitHubUser} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {userData && (
        <View style={styles.profile}>
          <Image source={{ uri: userData.avatar_url }} style={styles.avatar} />
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.bio}>{userData.bio}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#121212', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#fff' },
  input: { borderWidth: 1, borderColor: '555#', padding: 12, marginBottom: 10, borderRadius: 8,
     color: '#fff', backgroundColor: '#1e1e1e' },
  profile: { alignItems: 'center', marginTop: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginTop: 20 },
  name: { fontSize: 20, fontWeight: '600', color: '#fff', marginTop: 10, },
  bio: { fontSize: 16, color: '#aaa', textAlign: 'center', marginTop: 6, paddingHorizontal: 10, },
});
