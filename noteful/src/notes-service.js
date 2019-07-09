const NotesService = {
   getAllNotes(knex) {
    return knex.select('*').from('notes')
    },
    getById(knex, id) {
    return knex
        .from('notes')
        .select('*')
        .where('id', id)
        .first()
    },
    deleteNote(knex, id) {
    return knex('notes')
        .where({ id })
        .delete()
    },
    updateNotes(knex, id, newNoteFields) {
    return knex('notes')
        .where({ id })
        .update(newNoteFields)
    },
    insertNote(knex, newNote) {
    return knex
        .insert(newNote)
        .into('notes')
        .returning('*')
        .then(rows => rows[0])
    },
}

module.exports = NotesService