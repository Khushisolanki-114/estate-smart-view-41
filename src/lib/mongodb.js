
// MongoDB connection utility for frontend use
// This is a simple implementation for local development

// Collection names
export const COLLECTIONS = {
  USERS: 'users',
  CONTACT_REQUESTS: 'contact_requests',
  VIEWING_REQUESTS: 'viewing_requests',
  PROPERTIES: 'properties'
};

// In a real app, this would be replaced with actual MongoDB connection
// For now, we'll use localStorage to simulate MongoDB operations

/**
 * MongoDB-like client for local development
 */
class MongoDBClient {
  constructor() {
    this._storage = localStorage;
  }

  // Initialize a collection if it doesn't exist
  _initCollection(collectionName) {
    if (!this._storage.getItem(collectionName)) {
      this._storage.setItem(collectionName, JSON.stringify([]));
    }
    return JSON.parse(this._storage.getItem(collectionName));
  }

  // Save collection to localStorage
  _saveCollection(collectionName, data) {
    this._storage.setItem(collectionName, JSON.stringify(data));
    return data;
  }

  // MongoDB-like API
  collection(collectionName) {
    return {
      // Find documents in collection
      find: async (query = {}) => {
        const collection = this._initCollection(collectionName);
        if (Object.keys(query).length === 0) {
          return collection;
        }
        
        return collection.filter(item => {
          return Object.keys(query).every(key => {
            return item[key] === query[key];
          });
        });
      },
      
      // Find one document
      findOne: async (query = {}) => {
        const collection = this._initCollection(collectionName);
        return collection.find(item => {
          return Object.keys(query).every(key => {
            return item[key] === query[key];
          });
        }) || null;
      },
      
      // Insert documents
      insertOne: async (document) => {
        const collection = this._initCollection(collectionName);
        const newItem = { _id: Date.now().toString(), ...document };
        collection.push(newItem);
        this._saveCollection(collectionName, collection);
        return { insertedId: newItem._id, insertedDoc: newItem, error: null };
      },
      
      // Insert multiple documents
      insertMany: async (documents) => {
        const collection = this._initCollection(collectionName);
        const insertedIds = [];
        
        documents.forEach(document => {
          const newItem = { _id: Date.now().toString() + Math.random().toString(36).substring(2, 15), ...document };
          collection.push(newItem);
          insertedIds.push(newItem._id);
        });
        
        this._saveCollection(collectionName, collection);
        return { insertedIds, error: null };
      },
      
      // Update document
      updateOne: async (query, update) => {
        const collection = this._initCollection(collectionName);
        let updated = false;
        
        const updatedCollection = collection.map(item => {
          if (Object.keys(query).every(key => item[key] === query[key])) {
            updated = true;
            return { ...item, ...update.$set };
          }
          return item;
        });
        
        this._saveCollection(collectionName, updatedCollection);
        return { modifiedCount: updated ? 1 : 0, error: null };
      },
      
      // Delete document
      deleteOne: async (query) => {
        const collection = this._initCollection(collectionName);
        const initialLength = collection.length;
        
        const filteredCollection = collection.filter(item => {
          return !Object.keys(query).every(key => {
            return item[key] === query[key];
          });
        });
        
        this._saveCollection(collectionName, filteredCollection);
        return { deletedCount: initialLength - filteredCollection.length, error: null };
      }
    };
  }
}

// Create and export the MongoDB client
const mongoClient = new MongoDBClient();

export const useMongoDB = () => mongoClient;
