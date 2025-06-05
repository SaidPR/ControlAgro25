import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import useReportsViewModel from "../../viewmodels/reports/ReportViewModel";
import MenuLateral from "../../components/Slidebar";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const { width, height } = Dimensions.get("window");

const ReportList = ({ navigation }) => {
  const { reports } = useReportsViewModel(navigation);

  const renderReportCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ReportDetails", { report: item })}
    >
      <View style={styles.cardContent}>
        <Text style={styles.reportTitle}>{item.title}</Text>
        <Text style={styles.reportDate}>{item.date}</Text>
        <Text style={styles.reportDescription}>{item.description}</Text>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate("ReportDetails", { report: item })}
        >
          <Text style={styles.detailsButtonText}>Ver Detalles</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gestión de Reportes</Text>
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={renderReportCard}
        contentContainerStyle={styles.list}
      />
      <MenuLateral navigation={navigation} />
      <BottomNavigationBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 30,
  },
  header: {
    marginTop: height * 0.05,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#2c3e50",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  cardContent: {
    flexDirection: "column",
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2980b9",
  },
  reportDate: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 10,
  },
  reportDescription: {
    fontSize: 16,
    color: "#34495e",
    marginBottom: 15,
  },
  detailsButton: {
    alignSelf: "flex-start",
    backgroundColor: "#27ae60",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  detailsButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ReportList;