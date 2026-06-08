import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const API_BASE_URL = 'https://backend-agenda-refrigeracao-fullstack.onrender.com';
const API_ENTRIES_URL = `${API_BASE_URL}/api/entries`;

const SERVICOS = [
  'Instalação de ar-condicionado',
  'Manutenção preventiva',
  'Limpeza de ar-condicionado',
  'Conserto de ar-condicionado',
  'Carga de gás',
  'Troca de peças',
  'Orçamento técnico',
];

const HORARIOS = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

function formatarData(valor) {
  return String(valor).padStart(2, '0');
}

function criarOpcoesDeData() {
  const hoje = new Date();

  return Array.from({ length: 14 }, (_, index) => {
    const data = new Date(hoje);
    data.setDate(hoje.getDate() + index);

    const valor = `${data.getFullYear()}-${formatarData(data.getMonth() + 1)}-${formatarData(data.getDate())}`;
    const label = data.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
    });

    return { valor, label };
  });
}

export default function App() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [idEditando, setIdEditando] = useState(null);

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [servico, setServico] = useState('');
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [horarioSelecionado, setHorarioSelecionado] = useState('');
  const [observacao, setObservacao] = useState('');

  const opcoesDeData = criarOpcoesDeData();

  function criarDescricao() {
    return `Endereço: ${endereco}
Telefone: ${telefone}
Serviço: ${servico}
Observação: ${observacao || 'Sem observações'}`;
  }

  function pegarInfo(texto, campo) {
    const regex = new RegExp(`${campo}:\\s*(.*)`, 'i');
    const match = texto?.match(regex);
    return match ? match[1].trim() : '';
  }

  function criarDataHora() {
    if (!dataSelecionada || !horarioSelecionado) {
      return '';
    }

    return `${dataSelecionada}T${horarioSelecionado}:00`;
  }

  async function carregarAgendamentos() {
    try {
      const response = await fetch(API_ENTRIES_URL);
      const data = await response.json();
      setAgendamentos(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os agendamentos.');
    }
  }

  async function salvarAgendamento() {
    const dataHora = criarDataHora();

    if (!nome || !endereco || !telefone || !servico || !dataHora) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const dados = {
      title: nome,
      description: criarDescricao(),
      happenedAt: dataHora,
    };

    try {
      const url = idEditando ? `${API_ENTRIES_URL}/${idEditando}` : API_ENTRIES_URL;
      const method = idEditando ? 'PUT' : 'POST';

      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      limparFormulario();
      carregarAgendamentos();

      Alert.alert(
        'Sucesso',
        idEditando ? 'Agendamento atualizado!' : 'Agendamento criado!'
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o agendamento.');
    }
  }

  function editarAgendamento(item) {
    setIdEditando(item._id);
    setNome(item.title);
    setEndereco(pegarInfo(item.description, 'Endereço'));
    setTelefone(pegarInfo(item.description, 'Telefone'));
    setServico(pegarInfo(item.description, 'Serviço'));
    setObservacao(pegarInfo(item.description, 'Observação'));
    setDataSelecionada(item.happenedAt?.slice(0, 10) || '');
    setHorarioSelecionado(item.happenedAt?.slice(11, 16) || '');
  }

  async function excluirAgendamento(id) {
    Alert.alert('Excluir', 'Deseja excluir este agendamento?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await fetch(`${API_ENTRIES_URL}/${id}`, {
              method: 'DELETE',
            });

            carregarAgendamentos();
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir.');
          }
        },
      },
    ]);
  }

  function limparFormulario() {
    setIdEditando(null);
    setNome('');
    setEndereco('');
    setTelefone('');
    setServico('');
    setDataSelecionada('');
    setHorarioSelecionado('');
    setObservacao('');
  }

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>❄️ Agenda Refrigeração</Text>
      <Text style={styles.subtitle}>Cadastro de serviços</Text>

      <ScrollView style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do cliente"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={endereco}
          onChangeText={setEndereco}
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />

        <Text style={styles.fieldLabel}>Serviço solicitado</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={servico} onValueChange={setServico}>
            <Picker.Item label="Selecione o serviço" value="" />
            {SERVICOS.map((opcao) => (
              <Picker.Item key={opcao} label={opcao} value={opcao} />
            ))}
          </Picker>
        </View>

        <Text style={styles.fieldLabel}>Data</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateSelector}
        >
          {opcoesDeData.map((opcao) => (
            <TouchableOpacity
              key={opcao.valor}
              style={[
                styles.optionButton,
                dataSelecionada === opcao.valor && styles.optionButtonSelected,
              ]}
              onPress={() => setDataSelecionada(opcao.valor)}
            >
              <Text
                style={[
                  styles.optionText,
                  dataSelecionada === opcao.valor && styles.optionTextSelected,
                ]}
              >
                {opcao.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.fieldLabel}>Horário</Text>
        <View style={styles.timeGrid}>
          {HORARIOS.map((horario) => (
            <TouchableOpacity
              key={horario}
              style={[
                styles.timeButton,
                horarioSelecionado === horario && styles.optionButtonSelected,
              ]}
              onPress={() => setHorarioSelecionado(horario)}
            >
              <Text
                style={[
                  styles.optionText,
                  horarioSelecionado === horario && styles.optionTextSelected,
                ]}
              >
                {horario}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Observação"
          value={observacao}
          onChangeText={setObservacao}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={salvarAgendamento}>
          <Text style={styles.buttonText}>
            {idEditando ? 'Atualizar agendamento' : 'Salvar agendamento'}
          </Text>
        </TouchableOpacity>

        {idEditando && (
          <TouchableOpacity style={styles.cancelButton} onPress={limparFormulario}>
            <Text style={styles.buttonText}>Cancelar edição</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.listTitle}>Agendamentos</Text>

        <FlatList
          data={agendamentos}
          keyExtractor={(item) => item._id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>❄️ {item.title}</Text>
              <Text>📅 {new Date(item.happenedAt).toLocaleString('pt-BR')}</Text>
              <Text>📍 {pegarInfo(item.description, 'Endereço')}</Text>
              <Text>📞 {pegarInfo(item.description, 'Telefone')}</Text>
              <Text>🛠️ {pegarInfo(item.description, 'Serviço')}</Text>
              <Text>📝 {pegarInfo(item.description, 'Observação')}</Text>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => editarAgendamento(item)}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => excluirAgendamento(item._id)}
                >
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1f5f9',
    paddingTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0369a1',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#475569',
    marginBottom: 20,
  },
  form: {
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#94a3b8',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  fieldLabel: {
    color: '#334155',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#94a3b8',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
  },
  dateSelector: {
    marginBottom: 12,
  },
  optionButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#94a3b8',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 8,
  },
  optionButtonSelected: {
    backgroundColor: '#0369a1',
    borderColor: '#0369a1',
  },
  optionText: {
    color: '#334155',
    fontWeight: 'bold',
  },
  optionTextSelected: {
    color: '#fff',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  timeButton: {
    width: '31%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#94a3b8',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  textarea: {
    height: 90,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#0369a1',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#475569',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  listTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#0f172a',
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0369a1',
    marginBottom: 6,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#0284c7',
    padding: 10,
    borderRadius: 8,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#dc2626',
    padding: 10,
    borderRadius: 8,
  },
});
