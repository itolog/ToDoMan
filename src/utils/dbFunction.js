const SQLite = require("react-native-sqlite-storage");

const db = SQLite.openDatabase(
  { name: "db.db", location: "default" },
  () => {
    // console.log("db open");
  },
  (e) => {
    console.log(e);
  }
);

// Зоздание БАЗЫ ДАННЫХ
export const createDb = async (data, msg = "") => {
  await db.transaction((tx) => {
    tx.executeSql(data);
  });
};

// Добавление Пользователя
export const addUser = async (text) => {
  await db.transaction((tx) => {
    tx.executeSql("insert into user ( name) values ( ?)", [text]);
  });
};
// Выборка Пользователя
export const getInfoUser = async () => {
  await db.transaction(
    (tx) => {
      tx.executeSql("select * from user", [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    },
    (err) => {
      console.log(err);
    }
  );
};
// Инфо ЗАДАЧ
export const getInfoTable = async (table) => {
  await db.transaction(
    (tx) => {
      tx.executeSql(`select * from ${table}`, [], (_, { rows }) => {
        for (let i = 0; i < rows.length; ++i) {
          console.log(rows.item(i));
        }
      });
    },
    (err) => {
      console.log(err);
    }
  );
};

// Добавление Задачи
export const addItem = async (items, item, text, date) => {
  await db.transaction((tx) => {
    tx.executeSql(`insert into ${items} ( ${item}, date) values ( ?, ?)`, [
      text,
      date
    ]);
  });
};

// Удаление ЗАдачи
export const deleteItem = async (item, id) => {
  await db.transaction((tx) => {
    tx.executeSql(`delete from ${item} where id = ?;`, [id]);
  });
};
// Обновление задачи
export const updateItem = async (text, id, items, item) => {
  await db.transaction((tx) => {
    tx.executeSql(`update ${items} set ${item} = ? where id = ?;`, [text, id]);
  });
};

// Удаление Пользователя
export const deleteUser = async (name) => {
  await db.transaction((tx) => {
    tx.executeSql(`delete from user where name = ?;`, [name]);
  });
};

// Удаление ВСЕХ заметок
export const deleteAll = async (item) => {
  await db.transaction((tx) => {
    tx.executeSql(`delete from ${item};`);
  });
};
/*=============================================================== */
// Добавление В список
export const addListsItem = async (content, flag = "false") => {
  await db.transaction((tx) => {
    tx.executeSql("insert into lists (content, flag) values (?, ?)", [
      content,
      flag
    ]);
  });
};
