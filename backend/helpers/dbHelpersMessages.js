module.exports = (db) => {
  // Gets all messages in DB
  const getMessages = () => {
    const query = {
      text: 'SELECT * FROM messages',
    };
    
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  // Gets message by ID
  const getMessageById = id => {
    const query = {
      text: `SELECT * FROM messages WHERE id = $1` ,
      values: [id]
    };
    
    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };
  
  return {
    getMessages,
    getMessageById
  };
};