var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            }
        }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () {
            if (t[0] & 1)
                throw t[1];
            return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f)
            throw new TypeError("Generator is already executing.");
        while (_)
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                    return t;
                if (y = 0, t)
                    op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return { value: op[1], done: false };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2])
                            _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            }
            catch (e) {
                op = [6, e];
                y = 0;
            }
            finally {
                f = t = 0;
            }
        if (op[0] & 5)
            throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import shopifyClient from '@/util/shopifyClient';
export default {
    getProducts: function (_a) {
        var commit = _a.commit;
        return shopifyClient.product.fetchAll(40).then(function (products) {
            commit('SET_PRODUCTS', products);
        });
    },
    getProduct: function (_a, id) {
        var commit = _a.commit;
        return shopifyClient.product.fetch(id).then(function (product) {
            commit('SET_PRODUCT', product);
        });
    },
    getCheckout: function (_a, fresh) {
        var dispatch = _a.dispatch, commit = _a.commit;
        if (fresh === void 0) {
            fresh = false;
        }
        return __awaiter(this, void 0, void 0, function () {
            var checkout, checkoutId;
            return __generator(this, function (_b) {
                checkoutId = localStorage.getItem('vuetify_shopify_checkout_id');
                if (!fresh && checkoutId) {
                    checkout = shopifyClient.checkout.fetch(checkoutId);
                }
                else {
                    checkout = shopifyClient.checkout.create();
                }
                return [2 /*return*/, checkout.then(function (checkout) {
                        if (checkout.completedAt != null) {
                            return dispatch('getCheckout', true);
                        }
                        commit('SET_CHECKOUT', checkout);
                        localStorage.setItem('vuetify_shopify_checkout_id', checkout.id);
                    }).catch(function () { return dispatch('getCheckout', true); })];
            });
        });
    }
};
//# sourceMappingURL=actions.js.map
//# sourceMappingURL=actions.js.map
//# sourceMappingURL=actions.js.map
//# sourceMappingURL=actions.js.map