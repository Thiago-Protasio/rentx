import { container } from "tsyringe";

import { LocalStorageProvider } from "./implementations/LocalStorageProvider";
import { S3StorageProvider } from "./implementations/S3StorageProvider";
import { IStorageProvider } from "./IStorageProvider";

function diskStorage() {
    if (process.env.disk === "local") {
        return LocalStorageProvider;
    }
    return S3StorageProvider;
}

container.registerSingleton<IStorageProvider>("StorageProvider", diskStorage());
