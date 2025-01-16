import { Server } from "./presentation/server";
import { envs } from "./config/plugins/envs.plugin";

(async () => {
  await main();
})();

async function main() {
  await Server.start();
}
