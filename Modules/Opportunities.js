var Opportunities = function (logWriter, mongoose) {

    var opportunitiesSchema = mongoose.Schema({
        name: { type: String, default: '' },
        expectedRevenue: {
            value: { type: Number, default: '' },
            progress: { type: Number, default: '' },
            currency: { type: String, default: '' }
        },
        creationDate: { type: Date, default: Date.now },
        customer: {
            id: { type: String, default: '' },
            name: { type: String, default: '' }
        },
        email: { type: String, default: '' },
        phones: {
            phone: { type: String, default: '' }
        },
        salesPerson: {
            id: { type: String, default: '' },
            name: { type: String, default: '' }
        },
        salesTeam: {
            id: { type: String, default: '' },
            name: { type: String, default: '' }
        },
        internalNotes: { type: String, default: '' },
        nextAction: {
            desc: { type: String, default: '' },
            date: { type: Date, default: null }
        },
        expectedClosing: { type: Date, default: null },
        priority: {
            id: { type: String, default: '' },
            name: { type: String, default: '' }
        },
        categories: {
            id: { type: String, default: '' },
            name: { type: String, default: '' }
        },
        workflow: {
            status: { type: String, default: '' },
            name: { type: String, default: '' }
        }
    }, { collection: 'Opportunities' });

    var opportunitie = mongoose.model('Opportunities', opportunitiesSchema);

    function create(data, res) {
        try {
            if (!data) {
                logWriter.log('Opprtunities.create Incorrect Incoming Data');
                res.send(400, { error: 'Opprtunities.create Incorrect Incoming Data' });
                return;
            } else {
                var query = { name: data.name };
                opportunitie.find(query, function (error, doc) {
                    if (error) {
                        console.log(error);
                        logWriter.log('Opprtunities.js. create opportunitie.find' + error);
                        res.send(500, { error: 'Opprtunities.create find error' });
                    }
                    if (doc.length > 0) {
                        if (doc[0].name === data.name) {
                            res.send(400, { error: 'An Opprtunities with the same Name already exists' });
                        }
                    } else if (doc.length === 0) {
                        savetoDb(data);
                    }
                });
            }
            function savetoDb(data) {
                try {
                    _opportunitie = new opportunitie();
                    if (data.name) {
                        _opportunitie.name = data.name;
                    }
                    if (data.expectedRevenue) {
                        if (data.expectedRevenue.value) {
                            _opportunitie.expectedRevenue.value = data.expectedRevenue.value;
                        }
                        if (data.expectedRevenue.progress) {
                            _opportunitie.expectedRevenue.progress = data.expectedRevenue.progress;
                        }
                        if (data.expectedRevenue.currency) {
                            _opportunitie.expectedRevenue.currency = data.expectedRevenue.currency;
                        }
                    }
                    if (data.creationDate) {
                        _opportunitie.creationDate = data.creationDate;
                    }
                    if (data.customer) {
                        if (data.customer._id) {
                            _opportunitie.customer.id = data.customer._id;
                        }
                        if (data.customer.name) {
                            _opportunitie.customer.name = data.customer.name;
                        }
                    }
                    if (data.email) {
                        _opportunitie.email = data.email;
                    }
                    if (data.phones) {
                        if (data.phones.phone) {
                            _opportunitie.phones.phone = data.phones.phone;
                        }
                    }
                    if (data.salesPerson) {
                        if (data.salesPerson._id) {
                            _opportunitie.salesPerson.id = data.salesPerson._id;
                        }
                        if (data.customer.name) {
                            _opportunitie.salesPerson.name = data.salesPerson.name;
                        }
                    }
                    if (data.salesTeam) {
                        if (data.salesTeam._id) {
                            _opportunitie.salesTeam.id = data.salesTeam._id;
                        }
                        if (data.salesTeam.name) {
                            _opportunitie.salesTeam.name = data.salesTeam.name;
                        }
                    }
                    if (data.internalNotes) {
                        _opportunitie.internalNotes = data.internalNotes;
                    }
                    if (data.nextAction) {
                        if (data.nextAction.desc) {
                            _opportunitie.nextAction.desc = data.nextAction.desc;
                        }
                        if (data.nextAction.date) {
                            _opportunitie.nextAction.date = data.nextAction.date;
                        }
                    }
                    if (data.expectedClosing) {
                        _opportunitie.expectedClosing = data.expectedClosing;
                    }
                    if (data.priority) {
                        if (data.priority._id) {
                            _opportunitie.priority.id = data.priority._id;
                        }
                        if (data.priority.name) {
                            _opportunitie.priority.name = data.priority.name;
                        }
                    }
                    if (data.categories) {
                        if (data.categories._id) {
                            _opportunitie.categories.id = data.categories._id;
                        }
                        if (data.categories.name) {
                            _opportunitie.categories.name = data.categories.name;
                        }
                    }
                    if (data.workflow) {
                        if (data.workflow.name) {
                            _opportunitie.workflow.name = data.workflow.name;
                        }
                        if (data.workflow.status) {
                            _opportunitie.workflow.status = data.workflow.status;
                        }
                    }
                    _opportunitie.save(function (err, result) {
                        if (err) {
                            console.log(err);
                            logWriter.log("Opportunities.js create savetoDB _opportunitie.save " + err);
                            res.send(500, { error: 'Opportunities.save BD error' });
                        } else {
                            res.send(201, { success: 'A new Opportunities create success' });
                        }
                    });
                }
                catch (error) {
                    console.log(error);
                    logWriter.log("Opportunities.js create savetoDB " + error);
                    res.send(500, { error: 'Opportunities.save  error' });
                }
            }
        }
        catch (exception) {
            console.log(exception);
            logWriter.log("Opportunities.js  " + exception);
            res.send(500, { error: 'opportunitie.save  error' });
        }
    };

    function get(response) {
        var res = {};
        res['data'] = [];
        opportunitie.find({}, function (err, result) {
            if (err) {
                console.log(err);
                logWriter.log('Opportunities.js get job.find' + err);
                response.send(500, { error: "Can't find Opportunities" });
            } else {
                res['data'] = result;
                response.send(res);
            }
        });
    };

    function update(_id, data, res) {
        try {
            delete data._id;
            opportunitie.update({ _id: _id }, data, function (err, result) {
                if (err) {
                    console.log(err);
                    logWriter.log("Opportunities.js update opportunitie.update " + err);
                    res.send(500, { error: "Can't update Opportunities" });
                } else {
                    res.send(200, { success: 'Opportunities updated success' });
                }
            });
        }
        catch (exception) {
            console.log(exception);
            logWriter.log("Opportunities.js update " + exception);
            res.send(500, { error: 'Opportunities updated error' });
        }
    };// end update

    function remove(_id, res) {
        opportunitie.remove({ _id: _id }, function (err, result) {
            if (err) {
                console.log(err);
                logWriter.log("Opportunities.js remove opportunitie.remove " + err);
                res.send(500, { error: "Can't remove Opportunities" });
            } else {
                res.send(200, { success: 'Opportunities removed' });
            }
        });
    };// end remove

    return {
        create: create,

        get: get,

        update: update,

        remove: remove
    }
};
module.exports = Opportunities;
