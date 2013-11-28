define([
    "text!templates/Projects/EditTemplate.html",
    "custom",
    "common",
    "dataService"
],
    function (EditTemplate, Custom, common, dataService) {

        var EditView = Backbone.View.extend({
            contentType: "Projects",
            template: _.template(EditTemplate),
            initialize: function (options) {
                _.bindAll(this, "render");
                this.projectsCollection = options.collection;
                this.currentModel = this.projectsCollection.getElement();
                this.render();
            },

            events: {
                "click .breadcrumb a": "changeWorkflow",
                "click #saveBtn": "saveItem",
                "click #cancelBtn": "hideDialog",
                "change #workflowDd": "changeWorkflowValues"
            },
            hideDialog: function () {
                $('.edit-project-dialog').remove();
                Backbone.history.navigate("home/content-"+this.contentType);
            },

            changeWorkflow: function (e) {
                var mid = 39;
                var breadcrumb = $(e.target).closest('li');
                var a = breadcrumb.siblings().find("a");
                if (a.hasClass("active")) {
                    a.removeClass("active");
                }
                breadcrumb.find("a").addClass("active");
                var model = this.collection.get($(e.target).closest(".formHeader").siblings().find("form").data("id"));
                var ob = {
                    workflow: {
                        name: breadcrumb.data("name"),
                        status: breadcrumb.data("status")
                    }
                };

                model.set(ob);
                model.save({}, {
                    headers: {
                        mid: mid
                    }

                });

            },

            saveItem: function (event) {
                event.preventDefault();
                var self = this;

                var mid = 39;
                var projectName = $("#projectName").val();
                var projectShortDesc = $("#projectShortDesc").val();
                var customer = this.$el.find("#customerDd option:selected").val();
                var projectmanager = this.$el.find("#managerDd option:selected").val();
                var workflow = this.$el.find("#workflowValue option:selected").val();

                var $userNodes = $("#usereditDd option:selected"), users = [];
                $userNodes.each(function (key, val) {
                    users.push({
                        id: val.value,
                        name: val.innerHTML
                    });
                });
                var data = {
                    projectName: projectName,
                    projectShortDesc: projectShortDesc,
                    customer: customer ? customer : null,
                    projectmanager: projectmanager ? projectmanager: null,
                    workflow: workflow ? workflow : null,
                    teams: {
                        users: users
                    }

                };

                this.currentModel.save(data, {
                    headers: {
                        mid: mid
                    },
                    wait: true,
                    success: function () {
                        $('.edit-project-dialog').remove();
                        Backbone.history.navigate("home/content-" + self.contentType, { trigger: true });
                    },
                    error: function () {
                        $('.edit-project-dialog').remove();
                        Backbone.history.navigate("home", { trigger: true });
                    }
                });
            },

            changeWorkflowValues: function () {
                this.$("#workflowValue").html("");
                var that = this;
                var choosedWorkflow = _.filter(that.workflows, function (workflow) {
                    return workflow.wId == that.$("#workflowDd option:selected").val();
                });
                console.log(this.currentModel.get('workflow')._id);
                _.each(choosedWorkflow, function (value,key) {
                    this.currentModel.get('workflow')._id === value._id ?
                        this.$("#workflowValue").append( $('<option/>').val(value._id).text(value.name + " (" + value.status + ")" ).attr('selected', 'selected')):
                        this.$("#workflowValue").append( $('<option/>').val(value._id).text(value.name + " (" + value.status + ")" ));
                },this);
            },

            render: function () {
                var formString = this.template({
                    model: this.currentModel.toJSON()
                });

                this.$el = $(formString).dialog({
                    autoOpen: true,
                    resizable: false,
                    title: "Edit Project",
                    dialogClass: "edit-project-dialog",
                    width: "80%",
                    height: 225
                });
                var that = this;
                common.populateEmployeesDd(App.ID.managerSelect, "/getPersonsForDd", this.currentModel.toJSON());
                common.populateCustomers(App.ID.customerDd, "/Customer", this.currentModel.toJSON());
                common.populateEmployeesDd(App.ID.userEditDd, "/getPersonsForDd");
                common.populateWorkflows("Project", App.ID.workflowDd, App.ID.workflowNamesDd, "/Workflows", this.currentModel.toJSON());


                this.delegateEvents(this.events);

                return this;
            }

        });

        return EditView;
    });
