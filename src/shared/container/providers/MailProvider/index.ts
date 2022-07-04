import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

// const mailProvider = {
//     ethereal: container.resolve(EtherealMailProvider),
//     ses: container.resolve(SESMailProvider),
// };

function mailProvider() {
    if (process.env.MAIL_PROVIDER === "ethereal") {
        return container.resolve(EtherealMailProvider);
    }
    return container.resolve(SESMailProvider);
}

container.registerInstance<IMailProvider>("MailProvider", mailProvider());
