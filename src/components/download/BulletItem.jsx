import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  bullet: {
    width: 10,
  },
  listText: {
    flex: 1,
    textAlign: "justify",
  },
});

const BulletItem = ({ children }) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.listText}>{children}</Text>
    </View>
  );
};

export default BulletItem;
