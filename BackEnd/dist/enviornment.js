"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
var Environments;
(function (Environments) {
    Environments["local_environment"] = "local";
    Environments["dev_environment"] = "dev";
    Environments["prod_environment"] = "prod";
    Environments["qa_environment"] = "qa";
})(Environments || (Environments = {}));
var Roles;
(function (Roles) {
    Roles[Roles["Admin"] = 1] = "Admin";
    Roles[Roles["Regular"] = 0] = "Regular";
})(Roles = exports.Roles || (exports.Roles = {}));
class Environment {
    constructor(environment) {
        this.environment = environment;
    }
    IsAdminRole(roleType) {
        return roleType == Roles.Admin ? Roles.Admin : Roles.Regular;
    }
    getPort() {
        if (this.environment === Environments.prod_environment) {
            return 8081;
        }
        else if (this.environment === Environments.dev_environment) {
            return 8082;
        }
        else if (this.environment === Environments.qa_environment) {
            return 8083;
        }
        else {
            return 3000;
        }
    }
    getDBName() {
        if (this.environment === Environments.prod_environment) {
            return 'db_test_project_prod';
        }
        else if (this.environment === Environments.dev_environment) {
            return 'db_test_project_dev';
        }
        else if (this.environment === Environments.qa_environment) {
            return 'db_test_project_qa';
        }
        else {
            return 'db_test_project_local';
        }
    }
}
exports.default = new Environment(Environments.local_environment);
