import ns1En from "./locales/en/translation.json"
import ns2En from "./locales/ru/translation.json"

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "ns1"
        resources: {
            ns1: typeof ns1En,
            ns2: typeof ns2En
        }
    }
}