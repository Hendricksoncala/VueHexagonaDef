const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../../infrastructure/database/mongodb.cjs");
// Define el modelo de usuario y la lógica de negocio independiente de la tecnología de persistencia.
class User {
    async findById(id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('cliente');
        const [res] = await collection.find({ _id: new ObjectId(id) }).toArray();
        return res;
    }
    async findByNick(nick) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('cliente');
        const [res] = await collection.find({ nick: nick }).toArray();
        return res;
    }

    async findByEmail(email) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('cliente');
        const [res] = await collection.find({ email: email }).toArray();
        return res;
    }

    async findByDni(dni) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('cliente');
        const [res] = await collection.find({ cedula: dni }).toArray();
        return res;
    }

    async findByNickOrEmailOrCedula(nick, email, cedula) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('cliente');
        const res = await collection.aggregate(
            [
                {
                    $match: {
                        $or: [
                            { nick: nick },
                            { cedula: cedula },
                            { email: email }
                        ]
                    }
                },
                {
                    $addFields: {
                        firstMatch: {
                            $cond: {
                                if: { $eq: ["$nick", nick] },
                                then: "nick",
                                else: {
                                    $cond: {
                                        if: { $eq: ["$cedula", cedula] },
                                        then: "cedula",
                                        else: {
                                            $cond: {
                                                if: { $eq: ["$email", email] },
                                                then: "email",
                                                else: null
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    $project: {
                        firstMatch: 1,    
                        nick: 1,          
                        cedula: 1,        
                        email: 1
                    }
                }
            ]

        ).toArray();
        return res[0];
    }

    async insert(userData) {
        // Si existe un JSON Schema en la base de datos de MongoDB, es necesario agregar un manejador de errores con try-catch. En el domain/repositories/userRepository.js debe devolver el código de error correspondiente.
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('cliente');
        const res = await collection.insertMany([userData]);
        return res;
    }
    async findByIdAndUpdate(id, updateData, upsert) {
        // Si existe un JSON Schema en la base de datos de MongoDB, es necesario agregar un manejador de errores con try-catch. En el domain/repositories/userRepository.js debe devolver el código de error correspondiente.
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('cliente');
        const res = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData }, upsert);
        return res;
    }
    async findByIdAndDelete(id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('cliente');
        const res = await collection.deleteMany({ _id: new ObjectId(id) });
        return res;
    }

}

module.exports = User;