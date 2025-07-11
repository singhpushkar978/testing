class Note {
    constructor({ subject, bodyText, category = 'General', author = 'Anonymous' }) { 
      this.noteId = require('uuid').v4(); 
      this.subject = subject;
      this.bodyText = bodyText;
      this.category = category;
      this.author = author; 
      this.creationDate = new Date();
      this.lastModifiedDate = new Date();
    }
  }

module.exports = Note;