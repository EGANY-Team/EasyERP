/**
 * Created with JetBrains PhpStorm.
 * User: Ivan
 * Date: 04.12.13
 * Time: 10:59
 * To change this template use File | Settings | File Templates.
 */

define([
    'text!templates/Projects/list/ListTemplate.html',
    'text!templates/Projects/form/FormTemplate.html'

],

    function (TasksListTemplate, TasksFormTemplate) {
        var FormTasksView = Backbone.View.extend( {
            el: '#content-holder',
            initialize: function(options) {
                this.formModel = options.model;
            },
            render: function () {
                var formModel = this.formModel.toJSON();
                this.$el.html(_.template(TasksFormTemplate,formModel));
                return this;
            },
            editItem: function () {
                //create editView in dialog here
                new EditView({ model: this.formModel });
            },

            deleteItems: function () {
                var mid = 39;

                this.formModel.destroy({
                    headers: {
                        mid: mid
                    },
                    success: function () {
                        Backbone.history.navigate("#easyErp/Projects/list", { trigger: true });
                    }
                });

            }
        });

        return FormTasksView;
    });