//create a server object:

const express = require("express");
const Discord = require("discord.js");
const roblox = require("noblox.js");
const got = require("got");
const db = require("./db.js");
const ytdl = require("ytdl-core");
const paste = require("paste.ee");
const puppeteer = require("puppeteer");

const Maxxy = {};
const token = process.env.thefunny;
const subURLForGettingBans = "no-getout";
const prefix = "-";
const banPermsRole = "God";

// Initializing each API works the same.
// Some, like Sheri, might require a API Key.

// Each API can also customize your User-Agent
// if you follow the example below
// but this is not required

// the Default User-Agent is
// /<version> by hokkqi

//pollEmbed(msg, title, options, timeout, emojiList, forceEndPollEmoji);

//-eval pollEmbed("msg", "title", "options", 10, "emojiList", "forceEndPollEmoji");

//poll("GitHub or Git","GitHub or Git",{"GitHub","Git"},1000)
let Constan = 1;
const client = new Discord.Client();
const app = express();

app.get(`/`, async (request, response) => {
  response.sendStatus(200);
});

app.get(`/${subURLForGettingBans}`, async (request, response) => {
  let bans = (await db.get("bans")) || [];
  response.send(bans);
});

app.get("/get-username-from-id", async (request, response) => {
  let id = request.query.id;
  response.send(await roblox.getUsernameFromId(id));
});

let listener = app.listen(process.env.PORT, () => {
  console.log(
    "Your app is currently listening on port: " + listener.address().port
  );
  console.log(db);
});

class Ban {
  constructor(uID, reason) {
    this._userID = uID;
    this._reason = reason;
  }
  get userID() {
    return this._userID;
  }
  get reason() {
    return this._reason;
  }
}
function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}
client.on("ready", () => {
  console.log(`u ${client.user.tag}!`);

  client.user.setPresence({
    status: "dnd",
    activity: {
      name: "Alyx sex tapes",
      type: "WATCHING"
    }
  });
});
//PLAYING, STREAMING, LISTENING, WATCHING, CUSTOM_STATUS

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();
  if (command === "help") {
    let embed = new Discord.MessageEmbed();
    embed.setColor("PURPLE");
    embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
    embed.setTitle(`Commands`);

    embed.setDescription(`
    <Name> - <Description> - <Rank>
    
    ----    Util    ----
    
    help // You are already here (retard) // ALL
    ban // R-Bans a player // BOT-OWNER
    unban // Un R-Bans a player // BOT-OWNER
    
    ----    Fun    ----
    
    say // Bot repeats whatever you specify // ALL
    funfact // Sends back a fact from Max's memory // ALL
    askmax // 8ball but epic // ALL
    ss // ScreenShots a website using puppeteer (BROKEN) // ALL
    
    ----    Actions    ----
    
    smack // Smack the shit outta someone // ALL
    hug // Hug someone // ALL
    kiss // Kiss someone // ALL
    
    ----    NSFW    ----
    
    cum // sus // ALL
    furry // Pulls yiff from f-api // BOT-OWNER
    anime // no // NOBODY
    
    
    `);
    embed.setFooter("https://maxxy.ga/");
    return message.channel.send(embed);
  }

  if (command === "funfact") {
    const responses = [
      "A male Horse penis weighs over 11 pounds",
      "Cockroaches can live 1 week with their head removed",
      "Black people",
      "We lost 8 years switching to the gregorian calender",
      "Poland doesnt exist",
      "The color of your skin depended on the region and how close to the equator you live in",
      "A average male penis grows up to 5 inches",
      "Gas in the 30's was 10 cents (USD)",
      "H.P Lovecraft's Cat is named 'nigger'",
      "Women are tools",
      "Cum is a anti-depressant",
      "The crusade killed more jews than the holocaust"
    ];

    const ee = Math.floor(Math.random() * responses.length);

    message.channel.send(responses[ee]);
    return;
  }

  if (command === "say") {
    message
      .delete()
      .then((msg) => console.log(`Deleted message from ${msg.author.username}`))
      .catch(console.error);
    const saying = args.join(" ");
    message.channel.send(saying);
    return;
  }
  if (command === "cum") {
    message.channel.send(
      `${message.author} came on ${message.mentions.members.first()}` + " 😳"
    );

    return;
  }
  if (command === "hug") {
    message.channel.send(
      `${message.author} gave a hug to ${message.mentions.members.first()}`
    );

    return;
  }
  if (command === "kiss") {
    message.channel.send(
      `${message.author} gave a kiss to ${message.mentions.members.first()}`
    );

    return;
  }
  if (command === "smack") {
    message.channel.send(
      `${
        message.author
      } smacked the living fuck outta ${message.mentions.members.first()}`
    );

    return;
  }
  if (command === "askmax") {
    const saying = args.join(" ");
    let blacklisted = [
      "Pedo",
      "pedo",
      "groomer",
      "child groomer",
      "p e d o",
      "ped o",
      "pe do",
      "p edo",
      "pedophile"
    ];
    let foundInText = false;
    for (var i in blacklisted) {
      if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase()))
        foundInText = true;
    }
    if (foundInText) {
      message.delete();
      return message.channel.send("No");
    }
    const responses = [
      "Yes",
      "No",
      "Maybe",
      "Probably",
      "Definitely",
      "Could be Possible",
      "Nope",
      "Never",
      "Always",
      "Nooooooooooooo",
      "Very"
    ];

    const randomIndex = Math.floor(Math.random() * responses.length);
    message.channel.send("Maxxy Says: " + responses[randomIndex]);
    return;
  }
  if (command === "ss") {
    message.channel.send(`Broken
    
    ETA: 17 Years`);
  }
  if (command === "pemdas") {
    message.channel.send("Penis Erection Masturbation Dick Asshole Sex");
  }
  if (command === "roblox") {
    let username = args.join(" ");

    // if a username is supplied successfully
    if (username) {
      roblox
        .getIdFromUsername(username)
        .then((id) => {
          // if an identity is found under the username then continue collecting the rest of the data
          // sadly this means you can't search for banned users. f in the chat. maybe try using older apis
          // yes, i just did c# styled bracketing, do not mind me trying to bless your eyes

          if (id) {
            // next conditio
            roblox.getPlayerInfo(parseInt(id)).then(function (info) {
              // dates.. um. go try get a pear or a grape instead.
              let date = new Date(info.joinDate);
              let dateInfo = client.extractDate(date);

              // create new embed and establish some settings for it, tasty.
              let embed = new Discord.RichEmbed()
                .setColor("#FFFFFF")

                // the ${id} allows the id to change depending on user input
                // so it pretty much allows you to search for any profile off the roblox.com website.
                // neat, we've even got a thumbnail of the player available, if that wasn't enough information for you.
                .setUrl(`https://roblox.com/users/${id}/profile`)
                .setThumbnail(
                  `https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`
                )

                // more information, please senpai? you haven't given me anything :(
                .addField("Username", info.username || "Unresolvable", true)
                .addField("User ID", id || "Unresolvable", true)
                .addField("Blurb", info.blurb || "Nothing", true)
                .addField("Status", info.status || "Nothing", true)
                .addField(
                  "Account Age",
                  `${info.age} days old` || "Unresolvable"
                )
                .addField(
                  "Register Date",
                  `${dateInfo.month}/${dateInfo.day}/${dateInfo.year}` ||
                    "Unresolvable"
                )
                .addField("User Link", `https://roblox.com/users/${id}/profile`)
                .setFooter(`Powered By Noblox.js`, client.user.avatarURL);
              message.channel.send({ embed });
            });
          }

          // but what if the player is banned, or doesn't even exist?
          // houston, we have a problem.
        })
        .catch(function (err) {
          message.channel.send("User Doesnt Exist"); // catching error
        });
    } else {
      message.channel.send("Invalid Username");
    }
  }
  if (command === "eval") {
    if (
      !message.member.roles.cache.find((role) =>
        [banPermsRole].includes(role.name)
      )
    ) {
      return message.channel.send("No get out");
    }
    let blacklisted = [
      "client.token",
      "token",
      "toke",
      "process.env",
      "tok",
      "oken",
      "ken",
      '["toke"]',
      '["tok"]',
      "=client",
      '["oken"]',
      '["to"]',
      "client.destroy"
    ];
    let foundInText = false;
    for (var i in blacklisted) {
      if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase()))
        foundInText = true;
    }
    if (foundInText) {
      message.delete();
      return message.channel.send(
        "<https://www.youtube.com/watch?v=lhg9bYNLvOg>"
      );
    }
    try {
      const code = args.join(" ");
      let evaled = eval(code);
      if (evaled === token) {
        message.delete();
        return message.channel.send("If statements am i right?");
      }
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), { code: "xl" });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
  if (command === "ban") {
    if (
      !message.member.roles.cache.find((role) =>
        [banPermsRole].includes(role.name)
      )
    ) {
      return message.channel.send("No permission");
    }
    let username = args[0];
    if (!username) {
      return message.channel.send("You didn't supply a username for me to ban");
    }
    let id;
    try {
      id = await roblox.getIdFromUsername(username);
    } catch {
      return message.channel.send("Invalid username given");
    }
    let reason = args.splice(1).join(" ");
    if (!reason) {
      reason = "No reason given";
    }
    let bans = (await db.get("bans")) || [];
    for (var i = 0; i < bans.length; i++) {
      if (bans[i]._userID == id) {
        return message.channel.send("User already banned");
      }
    }
    let newBan = new Ban(id, reason);
    bans.push(newBan);
    await db.set("bans", bans);
    let embed = new Discord.MessageEmbed();
    embed.setColor("BLUE");
    embed.setAuthor(message.author.id, message.author.displayAvatarURL());
    embed.setTitle("Ban");
    embed.setDescription(
      `Successfully banned  **${await roblox.getUsernameFromId(id)}** `
    );
    embed.setFooter("MaxxyUI");
    return message.channel.send(
      `Successfully banned  **${await roblox.getUsernameFromId(id)}** `
    );
  }
  if (command === "getbans") {
    message.channel.send(
      "If a list doesnt load, say -getbansraw instead.   (Character Limit)"
    );
    if (
      !message.member.roles.cache.find((role) =>
        [banPermsRole].includes(role.name)
      )
    ) {
      return message.channel.send("No permission");
    }
    let bans = (await db.get("bans")) || [];
    let embed = new Discord.MessageEmbed();
    embed.setColor("YELLOW");
    embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
    embed.setTitle("Getting Bans..");
    embed.setDescription("Listing all bans in the field below");
    let fString = "";
    for (var i = 0; i < bans.length; i++) {
      fString += `Name: ${await roblox.getUsernameFromId(
        bans[i]._userID
      )} | UserID: ${bans[i]._userID} | Reason: ${bans[i]._reason}\n`;
    }
    if (fString === "") {
      embed.addField("Bans", "No Players Found");
      embed.setFooter("MaxxyUI");
      return message.channel.send(embed);
    }
    embed.addField("Bans", fString);
    embed.setFooter("MaxxyUI");

    return message.channel.send(embed);
  }
  if (command === "restart") {
    message.channel.send("Attempting To Reload The Bot");
    console.clear();

    client.destroy();
    client.login(token);

    message.channel.send("Successfully Restarted Bot");

    message.channel.send(
      `Client Latency: ${
        Date.now() - message.createdTimestamp
      }ms API Latency: ${Math.round(client.ws.ping)}ms`
    );

    message.delete(5000);
    return;
  }
  if (command === "about") {
    message.channel.send(
      "Totally not finnessed code from DevForum, recoded By Maxxy; ideas by [Insert Rich-Cunt Here]"
    );

    return;
  }
  if (command === "getbansraw") {
    if (
      !message.member.roles.cache.find((role) =>
        [banPermsRole].includes(role.name)
      )
    ) {
      return message.channel.send("No permission");
    }
    let bans = (await db.get("bans")) || [];
    let embed = new Discord.MessageEmbed();

    let fString = "";
    for (var i = 0; i < bans.length; i++) {
      fString += `Name: ${await roblox.getUsernameFromId(
        bans[i]._userID
      )} | UserID: ${bans[i]._userID} | Reason: ${bans[i]._reason}\n`;
    }
    if (fString === "") {
    }
    embed.addField("Bans", fString);

    var stringLength = embed.length;

    let post = await paste(
      fString,
      "aZPj5fJNbQK1a2XY9bEDmFqdmpKiB2jwJX8OEybKI",
      "Skids"
    );
    message.channel.send(`https://paste.ee/r/${post.id}`);
    return message.channel.send("Raw paste created.");
  }

  if (command === "unban") {
    if (
      !message.member.roles.cache.find((role) =>
        [banPermsRole].includes(role.name)
      )
    ) {
      return message.channel.send("No permission");
    }
    let username = args[0];
    if (!username) {
      return message.channel.send("Invalid Argument // No Username Specified");
    }
    let id;
    try {
      id = await roblox.getIdFromUsername(username);
    } catch {
      return message.channel.send("Invalid Argument // Unknown Username");
    }
    let bans = (await db.get("bans")) || [];
    let index = -1;
    for (var i = 0; i < bans.length; i++) {
      if (bans[i]._userID == id) {
        index = i;
      }
    }
    if (index == -1) {
      return message.channel.send("Invalid Argument // User Isnt Banned");
    }
    bans.splice(index, index + 1);
    await db.set("bans", bans);
    let embed = new Discord.MessageEmbed();
    embed.setColor("GREEN");
    embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
    embed.setTitle("Gmod Unban");
    embed.setDescription(`Unbanned **${await roblox.getUsernameFromId(id)}**`);
    embed.setFooter("MaxxyUI");
    return message.channel.send(
      `Successfully unbanned  **${await roblox.getUsernameFromId(id)}** `
    );
  }

  if (command === "setreason") {
    if (
      !message.member.roles.cache.find((role) =>
        [banPermsRole].includes(role.name)
      )
    ) {
      return message.channel.send("No permission");
    }
    let username = args[0];
    if (!username) {
      return message.channel.send("Invalid Argument // No Username Specified");
    }
    let id;
    try {
      id = await roblox.getIdFromUsername(username);
    } catch {
      return message.channel.send("Invalid Argument // Unknown Username");
    }
    let reason = args.splice(1).join(" ");
    if (!reason) {
      reason = "No reason given";
    }
    let bans = (await db.get("bans")) || [];
    let index = -1;
    for (var i = 0; i < bans.length; i++) {
      if (bans[i]._userID == id) {
        index = i;
      }
    }
    if (index == -1) {
      return message.channel.send("Invalid Argument // User Isnt Banned");
    }
    bans[index]._reason = reason;
    await db.set("bans", bans);
    let embed = new Discord.MessageEmbed();
    embed.setColor("GREEN");
    embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
    embed.setTitle("Success");
    embed.setDescription(
      `Set **${await roblox.getUsernameFromId(
        bans[index]._userID
      )}'s** ban reason to **${reason}**`
    );
    embed.setFooter("MaxxyUI");
    return message.channel.send(embed);
  }
});

client.login(token);
