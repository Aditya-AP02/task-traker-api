// models/Task.js
const db = require('../config/database');

const Task = {
    // GET ALL tasks
    getAll: async () => {
        try {
            const [rows] = await db.query('SELECT * FROM tasks ORDER BY created_at DESC');
            return rows;
        } catch (error) {
            console.error('Error in getAll:', error);
            throw error;
        }
    },

    // GET ONE task by ID
    getById: async (id) => {
        try {
            const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error('Error in getById:', error);
            throw error;
        }
    },

    // CREATE new task
    create: async (taskData) => {
        const { title, description } = taskData;
        try {
            const [result] = await db.query(
                'INSERT INTO tasks (title, description) VALUES (?, ?)',
                [title, description || '']
            );
            
            return {
                id: result.insertId,
                title,
                description: description || '',
                status: 0,
                created_at: new Date()
            };
        } catch (error) {
            console.error('Error in create:', error);
            throw error;
        }
    },

    // UPDATE task - FIXED VERSION
    update: async (id, updates) => {
        try {
            // Check if updates exists and is an object
            if (!updates || typeof updates !== 'object') {
                throw new Error('Updates must be an object');
            }

            const { title, description, status } = updates;
            
            // Build dynamic query
            let query = 'UPDATE tasks SET ';
            const values = [];
            let updatesNeeded = false;
            
            if (title !== undefined) {
                query += 'title = ?, ';
                values.push(title);
                updatesNeeded = true;
            }
            if (description !== undefined) {
                query += 'description = ?, ';
                values.push(description);
                updatesNeeded = true;
            }
            if (status !== undefined) {
                // Convert boolean to number (MySQL BOOLEAN is 0/1)
                const statusValue = status === true ? 1 : (status === false ? 0 : status);
                query += 'status = ?, ';
                values.push(statusValue);
                updatesNeeded = true;
            }
            
            // If no updates provided, return the current task
            if (!updatesNeeded) {
                return await Task.getById(id);
            }
            
            // Remove trailing comma and space
            query = query.slice(0, -2);
            query += ' WHERE id = ?';
            values.push(id);
            
            console.log('Update query:', query); // For debugging
            console.log('Values:', values); // For debugging
            
            const [result] = await db.query(query, values);
            
            if (result.affectedRows === 0) {
                return null; // Task not found
            }
            
            // Return updated task
            return await Task.getById(id);
        } catch (error) {
            console.error('Error in update:', error);
            throw error;
        }
    },

    // DELETE task
    delete: async (id) => {
        try {
            const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error in delete:', error);
            throw error;
        }
    }
};

module.exports = Task;