const SaveService = {
  getAllSavedTrails(db, user_id) {
    return db
      .select('*')
      .from('save')
      .where({ user_id })
  },

  insertSavedTrail(db, newTrail) {
    return db
      .insert(newTrail)
      .into('save')
      .returning('*')
      .then(rows => rows[0])
  },

  deleteSavedTrail(db, id) {
    return db
      .from('save')
      .where({ id })
      .delete()
  }

};