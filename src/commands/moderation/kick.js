/* ========== BAN COMMAND ========== */
// The command will permanently ban a user in the guild
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'kick',
  category: 'Moderation',
  description: '💂‍♂️Use this command to kick a user',
  slash: true,
  permissions: ['BAN_MEMBERS'],
  options: [
    {
      name: 'user',
      description: 'The user you want to kick',
      required: true,
      type: 6,
    },
    {
      name: 'reason',
      description: 'Why you want to kick the user',
      required: false,
      type: 3,
    },
  ],

  callback: async ({ interaction }) => {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');
    interaction.guild.members.kick(user, { reason: reason });

    const Embed = new MessageEmbed()
      .setColor('#66b032')
      .setAuthor(
        `Moderator: ${interaction.user.username}#${interaction.user.discriminator}`
      )
      .setThumbnail(interaction.options.getUser('user').avatarURL())
      .setFooter(
        `Invoked by ${interaction.user.username}#${interaction.user.discriminator}`
      )
      .setTimestamp()
      .addField(
        'User kicked from the guild',
        `The user **${
          interaction.options.getUser('user').username
        }** has been kicked from the guild with the following reason:\n**${interaction.options.getString(
          'reason'
        )}**`,
        true
      );

    await interaction.reply({ embeds: [Embed] });
  },
};
