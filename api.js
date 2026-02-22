const API_URL = 'http://localhost:3000/api';

window.dataSdk = {
  handler: null,
  isConnected: false,

  async init(handler) {
    this.handler = handler;
    try {
      const response = await fetch(`${API_URL}/data`, { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      this.isConnected = true;
      console.log('✅ Connected to database successfully');
      console.log(`📊 Loaded ${data.length} records from database`);
      
      if (handler.onDataChanged) {
        handler.onDataChanged(data);
      }
      return { isOk: true };
    } catch (error) {
      this.isConnected = false;
      console.warn('⚠️ Database connection failed - using localStorage instead');
      console.warn('Error:', error.message);
      console.info('💡 To fix: Start the backend server with "npm start"');
      return { isOk: false };
    }
  },

  async create(data) {
    const response = await fetch(`${API_URL}/data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (this.handler?.onDataChanged) {
      const allData = await fetch(`${API_URL}/data`).then(r => r.json());
      this.handler.onDataChanged(allData);
    }
    return result;
  },

  async update(data) {
    const id = data._id || data.__backendId;
    const response = await fetch(`${API_URL}/data/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (this.handler?.onDataChanged) {
      const allData = await fetch(`${API_URL}/data`).then(r => r.json());
      this.handler.onDataChanged(allData);
    }
    return result;
  },

  async delete(data) {
    const id = data._id || data.__backendId;
    await fetch(`${API_URL}/data/${id}`, { method: 'DELETE' });
    if (this.handler?.onDataChanged) {
      const allData = await fetch(`${API_URL}/data`).then(r => r.json());
      this.handler.onDataChanged(allData);
    }
  }
};
