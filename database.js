import * as SQLite from "expo-sqlite/legacy";

const db = SQLite.openDatabase("little_lemon");

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists menuitems (id integer primary key not null, name text, price text, category text, description text, image text);"
        );
      },
      reject,
      resolve("Successful")
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql("select * from menuitems", [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}
export function saveMenuItems(menuItems) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      menuItems.forEach((item) => {
        const { id, name, price, category, description, image } = item;
        //const uuid = id.toString(); // Convert id to string and use it as uuid
        tx.executeSql(
          "INSERT INTO menuitems (id, name, price, category, description, image) VALUES (?, ?, ?, ?, ?, ?)",
          [id, name, price, category, description, image],
          (_, result) => {
            // Success callback
            console.log("Inserted menu item with ID:", result.insertId);
          },
          (_, error) => {
            // Transaction failed
            console.error("Error saving menu items:", error);
            reject(error);
            return true; // Rollback the transaction
          }
        );
      });
      resolve(); // Resolve the Promise once all transactions are completed
    });
  });
}

export const filterMenuItems = async (filterArray, searchQuery) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const placeholders = filterArray.map((item) => " ? ");
      const query = `SELECT * FROM menuItems WHERE  name LIKE ? AND category IN (${placeholders})`;
      const queryParams = [`%${searchQuery}%`, ...filterArray];

      tx.executeSql(
        query,
        queryParams,
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          console.error("Error filtering menuItems:", error);
          reject(error);
        }
      );
    });
  });
};

//Display database data in console
export function displayMenuItems() {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM menuitems",
      [],
      (_, { rows }) => {
        const items = rows._array;
        if (items.length > 0) {
          const columns = Object.keys(items[0]);
          console.log(columns.join(" | ")); // Print column headers
          items.forEach((item) => {
            console.log(columns.map((column) => item[column]).join(" | ")); // Print each row
          });
        } else {
          console.log("No menu items found.");
        }
      },
      (error) => {
        console.error("Error querying the menuitems table:", error);
      }
    );
  });
}

export async function deleteTable() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE IF EXISTS menuitems;",
        [],
        () => {
          resolve("Table deleted successfully");
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

//deleteTable();
