define(["Validation"],function (Validation) {
    var PersonModel = Backbone.Model.extend({
        idAttribute: "_id",

        initialize: function(){
            this.on('invalid', function(model, errors){
                if(errors.length > 0){
                    var msg = $.map(errors,function(error){
                        return error.msg;
                    }).join('\n');
                    alert(msg);
                }
            });
        },

        validate: function(attrs){
            var errors = [];

            if($.trim(attrs.name.first) == ""){
                errors.push(
                    {
                        name: "Person",
                        field: "firstName",
                        msg: "First name can not be empty or contain whitespaces"
                    }
                );
            }
            
            if($.trim(attrs.name.last) == ""){
                errors.push(
                    {
                        name: "Person",
                        field: "lastName",
                        msg: "Last name can not be empty or contain whitespaces"
                    }
                );
            }

            if(attrs.phones.phone.length > 0){
                if(!Validation.validPhone(attrs.phones.phone)){
                    errors.push(
                        {
                            name: "Person",
                            field: "phone",
                            msg: "Phone should contain only numbers"
                        }
                    );
                }
            }
            if(attrs.phones.fax.length > 0){
                if(!Validation.validPhone(attrs.phones.fax)){
                    errors.push(
                        {
                            name: "Person",
                            field: "fax",
                            msg: "Fax should contain only numbers"
                        }
                    );
                }
            }
            if(attrs.phones.mobile.length > 0){
                if(!Validation.validPhone(attrs.phones.mobile)){
                    errors.push(
                        {
                            name: "Person",
                            field: "mobile",
                            msg: "Mobile phone should contain only numbers"
                        }
                    );
                }
            }
            if(attrs.name.last.length > 0){
                if(!Validation.validName(attrs.name.last)){
                    errors.push(
                        {
                            name: "Person",
                            field: "lastName",
                            msg: "Last name should contain only letters"
                        }
                    );
                }
            }
            if(attrs.name.first.length > 0){
                if(!Validation.validName(attrs.name.first)){
                    errors.push(
                        {
                            name: "Person",
                            field: "firstName",
                            msg: "First name should contain only letters"
                    }
                );
            }
            }

            if ($.trim(attrs.jobPosition).length > 20) {
                errors.push(
                    {
                        name: "Person",
                        field: "jobPosition",
                        msg: "Person position can not be more than 20 chars"
                    }
                );
            }
          
            if (new Date($.trim(attrs.dateBirth)) > new Date(Date.now())) {
                errors.push(
                    {
                        name: "Person",
                        field: "dateBirth",
                        msg: "Person birthday can not be more than current date"
                    }
                );
            }
     
          
            if ($.trim(attrs.phones.mobile).length > 20) {
                errors.push(
                    {
                        name: "Person",
                        field: "mobile",
                        msg: "Person mobile can not be more than 20 chars"
                    }
                );
            }
            
            if(errors.length > 0)
                return errors;
        },

        defaults: {
            id: null,
            type: 'Person',
            imageSrc: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAAAAACPAi4CAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABAAAAAQADq8/hgAAAEaElEQVRYw82X6XLbNhCA+f4PVomk5MRyHDtp63oEgDcl3vfRBQhQIEVKSvsnO+OxRBEfFnthV+n/pyi/NaCryzzL8rJu/wOgzQPXJBgjhDExnXPW/Aqgy30DI0yIwYQQ4Bhe2j0I6BIbI1jL9meC2TdkRu0jgMxCGN5H2HT8IIzjKPAdE9NngEjuAhqfv3rOpe3aIrDAFoB1qtuA3ADlMXKuz9vlLqZokt4CxPAOQXa2bPDCRVSJYB0QIDA4ibp+TVKDbuCvAeh6YpX9DWkcUGJCkAARXW9UfXeL0PmUcF4CZBA4cALv5nqQM+yD4mtATQMOGMi9RzghiKriCuBiAzsB1e8uwUUGtroZIAEsqfqHCI2JjdGZHNDSZzHYb0boQK4JOTVXNQFEoJXDPskEvrYTrJHgIwOdZEBrggXzfkbo+sY7Hp0Fx9bUYbUEAAtgV/waHAcCnOew3arbLy5lVXGSXIrKGQkrKKMLcnHsPjEGAla1PYi+/YCV37e7DRp1qUDjwREK1wjbo56hezRoPLxt9lzUg+m96Hvtz3BMcU9syQAxKBSJ/c2Nqv0Em5C/97q+BdGoEuoORN98CkAqzsAAPh690vdv2tOOEcx/dodP0zq+qjpoQQF7/Vno2UA0OgLQQbUZI6t/1+BlRgAlyywvqtNXja0HFQ7jGVwoUA0HUBNcMvRdpW8PpzDPYRAERfmNE/TDuE8Ajis4oJAiUwB2+g+am3YEEmT5kz4HgOdRygHUIPEMsFf/YvXJYoSKbPczQI4HwysSbKKBdk4dLAhJsptrUHK1lSERUDYD6E9pGLsjoXzRZgAIJVaYBCCfA57zMBoJYfV9CXDigHhRgww2Hgngh4UjnCUbJAs2CEdCkl25kbou5ABh0KkXPupA6IB8fOUF4TpFOs5Eg50eFSOBfOz0GYCWoJwDoJzwcjQBfM2rMAjD0CEsL/Qp4ISG/FHkuJ4A9toXv66KomosMMNAuAA6GxOWPwqP64sb3kTm7HX1Fbsued9BXjACZKNIphLz/FF4WIps6vqff+jaIFAONiBbTf1hDITti5RLg+cYoDOxqJFwxb0dXmT5Bn/Pn8wOh9dQnMASK4aaSGuk+G24DObCbm5XzkXs9RdASTuytUZO6Czdm2BCA2cSgNbIWedxk0AV4FVYEYFJpLK4SuA3DrsceQEQl6svXy33CKfxIrwAanqZBA8R4AAQWeUMwJ6CZ7t7BIh6utfos0uLwxqP7BECMaTUuQCoawhO+9sSUWtjs1kA9I1Fm8DoNiCl64nUCsp9Ym1SgncjoLoz7YTl9dNOtbGRYSAjWbMDNPKw3py0otNeufVYN2wvzha5g6iGzlTDebsfEdbtW9EsLOvYZs06Dmbsq4GjcoeBgThBWtRN2zZ1mYUuGZ7axfz9hZEns+mMQ+ckzIYm/gn+WQvWWRq6uoxuSNi4RWWAYGfRuCtjXx25Bh25MGaTFzaccCVX1wfPtkiCk+e6nh/ExXps/N6z80PyL8wPTYgPwzDiAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDExLTAxLTE5VDAzOjU5OjAwKzAxOjAwaFry6QAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMC0xMi0yMVQxNDozMDo0NCswMTowMGxOe/8AAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC",
            photoUrl: null,
            name: {
                first: "",
                last: ""
            },
            email: "",
            address: {
                street1: "",
                street2: "",
                city: "",
                zip: "",
                country: "",
                state: ""
            },
            website: "",
            jobPosition: "",
            skype: "",
            phones: {
                phone: "",
                mobile: "",
                fax: ""
            },
            salesPurchases: {
                isCustomer: true,
                isSupplier: false,
                active: false
            },
            department: null,
            color: '#4d5a75',
            dateBirth: null,
            attachments:[],
            notes:[]
        },

        urlRoot: function () {
            return "/Persons";
        }
    });

    return PersonModel;
});