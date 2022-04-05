/**
 * IDBFactory.open 方法用于打开一个数据库连接。本方法立即返回一个 IDBOpenDBRequest 对象，
 * 但打开数据库的操作是异步执行的。
 * 连接数据库在一个单独的线程中进行，包括以下几个步骤：
 *  1. 指定数据库已经存在时：
        等待 versionchange 操作完成。
        如果数据库已计划删除，那等着删除完成。
    2. 如果已有数据库版本高于给定的 version，中止操作并返回类型为 VersionError 的 DOMError 。
    3. 如果已有数据库版本低于给定的 version，触发一个 versionchange 操作。
    4. 如果数据库不存在，创建指定名称的数据库，将版本号设置为给定版本，如果给定版本号，则设置为1，and no object stores.
    5. 创建数据库连接。
参数：
    name: 数据库名称
    version: 指定数据库版本，当你想要更改数据库格式（比如增加对象存储，非增加记录），必须指定更高版本，通过 versionchange 来更改
回调：
onerror: 事件表示打开数据库失败。
onsuccess：事件表示成功打开数据库。
onupgradeneeded：如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件。
 */
let db;
let openRequest = window.indexedDB.open("todo", 1);
openRequest.onerror = function (event) {
  console.log("数据库打开失败");
};

openRequest.onsuccess = function (event) {
  console.log("数据库打开成功");
  db = event.target.result
  readAll((list)=>{
    console.log(list)
  })
};

openRequest.onupgradeneeded = function (event) {
  console.log("数据库版本升级");
  db = event.target.result;
  if (!db.objectStoreNames.contains('thinks')) {
    db.createObjectStore("thinks", { keyPath: "title" });
  }
  
//   https://stackoverflow.com/questions/33709976/uncaught-invalidstateerror-failed-to-execute-transaction-on-idbdatabase-a
// onupgradeneeded 完事之后才能增加数据
  let transaction = event.target.transaction;
  transaction.oncomplete = function (event) {
      add("待办事项的使用", "如何使用待办事项");
      add("学习indexDB", "indexDB使用124");
  };
};

function add(title, comment) {
  let addRequest = db
    .transaction(["thinks"], "readwrite")
    .objectStore("thinks")
    .add({
      title: title,
      status: 1,
      date: Date.parse(new Date()),
      comment: comment,
    });
  addRequest.onsuccess = function (event) {
    console.log("数据写入成功！");
  };

  addRequest.onerror = function (event) {
    console.log("数据写入失败！");
  };
}

function readAll(finish) {
    let transaction = db.transaction(['thinks'])
    let objectStore = transaction.objectStore('thinks')
    let list = []
    objectStore.openCursor().onsuccess = function(event) {
        let cursor = event.target.result
        if (cursor) {
            list.push(cursor.value)
            //继续读取下一条
            cursor.continue()
        } else {
            console.log('数据读取完毕')
            finish(list)
        }
    }
}


/** 
 * https://www.cnblogs.com/chenjun1/p/11644866.html
 * 
 */