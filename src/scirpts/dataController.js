import {dataPreLoad, schema} from "./dataToTemplate"



const storeManagerCookies = function (schema) {
  const that = {}
  that.setObj = function(objname, obj) {
    storeObj[objname] = obj
    stage[objname] = true
  }
  that.getObj = function(objname) {
    return storeObj[objname]
  }
  that.commit = function() {
    for (let objName in stage) {
      let convertData = JSON.stringify(storeObj[objName])
      const validade = new Date((new Date()).getTime() + 20*24*60*60*1000).toGMTString()
      document.cookie = objName + "=" + convertData + ";expires=" + validade + ";SameSite=None; Secure;"
    }
    stage = {}
  }
  const storeObj = {temp:{}}
  let stage = {}
  let cookies = document.cookie.split(';')
  if (!cookies[0]) {
    let dataLoad
    for (let table in schema) {
      if (schema.hasOwnProperty(table)) {
        storeObj[table] = dataPreLoad[table] || []
        dataLoad = (dataPreLoad[table] && true) || dataLoad
        storeObj.temp[table] = {}
        stage[table] = true
        if (schema[table].fieldIndex) {
          storeObj[table + 'Index'] = dataPreLoad[table + 'Index'] || {}
          stage[table + 'Index'] = true
        }
        if (schema[table].foreingIndexes) {
          for (let foreingIndex in schema[table].foreingIndexes) {
            if (schema[table].foreingIndexes.hasOwnProperty(foreingIndex)) {
              storeObj[schema[table].foreingIndexes[foreingIndex]] =
              dataPreLoad[schema[table].foreingIndexes[foreingIndex]] || {}
              stage[schema[table].foreingIndexes[foreingIndex]] = true
            }
          }
        }
      }
    }
    stage.temp = true
    if (dataLoad) {
      that.commit()
      dataLoad = undefined
    }
  } else {
    for (let i = 0; i < cookies.length; i++) {
      const cookieData = (cookies[i] || '').trim().split('=')
      if (cookieData[1] && schema[cookieData[0]]) {
        storeObj[cookieData[0]] = JSON.parse(cookieData[1])
      }
    }
  }
  cookies = undefined
  return that
}(schema)

  
const storeLocalManager = function (schema) {
  if (!window || !window.localStorage) {
    return
  }
  const that = {}
  that.setObj = function(objname, obj) {
    storeObj[objname] = obj
    stage[objname] = true
  }
  that.getObj = function(objname) {
    return storeObj[objname]
  }
  that.commit = function() {
    for (let objName in stage) {
      let convertData = JSON.stringify(storeObj[objName])
      localStorage.setItem(objName, convertData)
    }
    stage = {}
  }
  const storeObj = {temp:{}}
  let stage = {}
  let dataLoad
  for (let table in schema) {
    if (schema.hasOwnProperty(table)) {
      if (localStorage.getItem(table)) {
        storeObj[table] = JSON.parse(localStorage.getItem(table))
        if (schema[table].fieldIndex) {
          storeObj[table + 'Index'] = JSON.parse(localStorage.getItem(table + 'Index'))
        }
        if (schema[table].foreingIndexes) {
          for (let foreingIndex in schema[table].foreingIndexes) {
            if (schema[table].foreingIndexes.hasOwnProperty(foreingIndex)) {
              storeObj[schema[table].foreingIndexes[foreingIndex]] = JSON.parse(
                localStorage.getItem(schema[table].foreingIndexes[foreingIndex])
              )
            }
          }
        }
      } else {
        storeObj[table] = dataPreLoad[table] || []
        dataLoad = (dataPreLoad[table] && true) || dataLoad
        storeObj.temp[table] = {}
        stage[table] = true
        if (schema[table].fieldIndex) {
          storeObj[table + 'Index'] = dataPreLoad[table + 'Index'] || {}
          stage[table + 'Index'] = true
        }
        if (schema[table].foreingIndexes) {
          for (let foreingIndex in schema[table].foreingIndexes) {
            if (schema[table].foreingIndexes.hasOwnProperty(foreingIndex)) {
              storeObj[schema[table].foreingIndexes[foreingIndex]] =
              dataPreLoad[schema[table].foreingIndexes[foreingIndex]] || {}
              stage[schema[table].foreingIndexes[foreingIndex]] = true
            }
          }
        }
      }
    }
  }
  if (localStorage.getItem('temp')) {
    storeObj.temp = JSON.parse(localStorage.getItem('temp'))
  } else {
    stage.temp = true
  }
  if (dataLoad) {
    that.commit()
    dataLoad = undefined
  }
  return that
}(schema)

const storage = function (schema, storeManager) {
  const that = {}
  
  const incrementIndex = function (foreingIndexName, key, reference) {
    let indexIncrement = 0
    let foreingIndex = storeManager.getObj(foreingIndexName)
    while (foreingIndex[key + indexIncrement] !== undefined) {
      indexIncrement++
    }
    foreingIndex[key + indexIncrement] = reference
    storeManager.setObj(foreingIndexName, foreingIndex)
  }

  const changeIndex = function (foreingTableName, foreingIndexName, fieldIndex, key, previousKey) {
    let indexIncrement = 0
    let foreingIndex = storeManager.getObj(foreingIndexName)
    let foreingTable = storeManager.getObj(foreingTableName)
    while (foreingIndex[previousKey + indexIncrement] !== undefined) {
      foreingTable[foreingIndex[previousKey + indexIncrement]][fieldIndex] = key
      foreingIndex[key + indexIncrement] = foreingIndex[previousKey + indexIncrement]
      delete foreingIndex[previousKey + indexIncrement]
      indexIncrement++
    }
    storeManager.setObj(foreingIndexName, foreingIndex)
    storeManager.setObj(foreingTableName, foreingTable)
  }
  
  that.setRow = function(tableName, values, previousKey) {
    let table = storeManager.getObj(tableName)
    if (schema[tableName] && schema[tableName].primariesTables) {
      for (let fieldIndex in schema[tableName].primariesTables) {
        if (schema[tableName].primariesTables.hasOwnProperty(fieldIndex)) {
          let primaryTableName = schema[tableName].primariesTables[fieldIndex]
          let primaryTable = storeManager.getObj(primaryTableName)
          let primaryIndex = storeManager.getObj(primaryTableName + 'Index')
          let primaryKey = values[fieldIndex]
          if (!primaryTable[[primaryIndex[primaryKey]]]) {
            throw new Error('Integrity failure')
          }
          if (schema[primaryTableName] && schema[primaryTableName].foreingIndexes) {
            let foreingIndexName = schema[primaryTableName].foreingIndexes[tableName]
            incrementIndex(foreingIndexName, primaryKey, table.length)
          }
        }
      }
    }
    let tableFieldIndex = schema[tableName].fieldIndex
    if (tableFieldIndex) {
      let tablePrimaryKey = values[tableFieldIndex]
      let tableIndex = storeManager.getObj(tableName + 'Index')
      if (previousKey !== undefined && previousKey !== null) {
        if (schema[tableName] && schema[tableName].foreingIndexes) {
          for (let foreingTableName in schema[tableName].foreingIndexes) {
            if (schema[tableName].foreingIndexes.hasOwnProperty(foreingTableName)) {
              let foreingIndexName = schema[tableName].foreingIndexes[foreingTableName]
              changeIndex(foreingTableName, foreingIndexName, tableFieldIndex, tablePrimaryKey, previousKey)
            }
          }
        }
        table[tableIndex[previousKey]] = values
        tableIndex[tablePrimaryKey] = tableIndex[previousKey]
        delete tableIndex[previousKey]
        storeManager.setObj(tableName + 'Index', tableIndex)
      } else if (tableIndex[tablePrimaryKey] !== undefined) {
        table[tableIndex[tablePrimaryKey]] = values
      } else {
        tableIndex[tablePrimaryKey] = table.length
        table.push(values)
        storeManager.setObj(tableName + 'Index', tableIndex)
      }
    } else {   
      table.push(values)
    }
    storeManager.setObj(tableName, table)
  }
  
  that.length = function(tableName) {
    return storeManager.getObj(tableName).length
  }
  
  that.getRow = function(tableName, key) {
    const table = storeManager.getObj(tableName)
    if (table) {
      if (typeof table[key] === 'number' || typeof table[key] === 'string') {
        return table[key]
      }
      if (table[key]) {
        return {...table[key]}
      }
    }
  }
  
  
  that.getField = function(tableName, field, key) {
    const tableIndex = storeManager.getObj(tableName + 'Index')
    const table = storeManager.getObj(tableName)
    if (tableIndex) {
      if (table && table[tableIndex[key]]) {
        return table[tableIndex[key]][field]
      }
    } else{
      return table[key][field]
    }
  }
  
  that.getTemp = function(tableName) {
    const temp = storeManager.getObj('temp')
    return temp[tableName]
  }
  
  that.setTemp = function(tableName, values) {
    const temp = storeManager.getObj('temp')
    temp[tableName] = values
    storeManager.setObj('temp', temp)
    storeManager.commit()
  }
  
  that.getTempField = function(tableName, field) {
    const temp = storeManager.getObj('temp')
    return temp[tableName][field]
  }
  
  that.setTempField = function(tableName, field, value) {
    const temp = storeManager.getObj('temp')
    temp[tableName][field] = value
    storeManager.setObj('temp', temp)
    storeManager.commit()
  }
  
  that.setField = function(tableName, field, key, value) {
    const tableIndex = storeManager.getObj(tableName + 'Index')
    const table = storeManager.getObj(tableName)
    if (table &&
      table.fieldIndex !== field &&
      (!schema[tableName].primariesTables ||
      !schema[tableName].primariesTables[field])) {
        if (tableIndex) {
          if (table[tableIndex[key]]) {
            table[tableIndex[key]][field] = value
            storeManager.setObj(tableName, table)
          }
        } else {
          if (table[key]) {
            table[key][field] = value
            storeManager.setObj(tableName, table)
          }
        }
    }
  }
  
  that.commit = function() {
    storeManager.commit()
  }
  return that
}(schema, storeLocalManager || storeManagerCookies)

export default storage
