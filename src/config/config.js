import fs from "fs";
import yaml from "js-yaml";

const commands = () => {
    return yaml.load(fs.readFileSync("./src/commands.yaml", "utf-8")).commands;
}

export default commands