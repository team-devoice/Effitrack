const mongoose = require('mongoose');

const userAddSchema = new mongoose.Schema({
    username: { type: String, required: true },
    public_username: { type: String, required: false }, // Set required to false or remove it if it's optional
    age: { type: String, default: '' },
    contact: { type: String, default: '' },
    state: { type: String, default: '' },
    college: { type: String, default: '' },
    startyear: { type: String, default: '' },
    endyear: { type: String, default: '' },
    degree: { type: String, default: '' },
    job: { type: String, default: '' },
    company: { type: String, default: '' },
    experience: { type: String, default: '' },
    cgpa: { type: String, default: '' },
    school: { type: String, default: '' },
    project: {
        type: [
            {
                proj_name: { type: String, default: '' },
                link: { type: String, default: '' },
                description: { type: String, default: '' },
            }
        ],
        default: [],
    },
    programming_language: {
        type: [
            {
                lan_name: { type: String, default: '' },
            }
        ],
        default: [],
    },
    certifications: {
        type: [
            {
                cert_name: { type: String, default: '' },
                link: { type: String, default: '' },
                description: { type: String, default: '' },
            }
        ],
        default: [],
    },
});

const userAddModel = mongoose.model('userAdd', userAddSchema);

module.exports = userAddModel;
