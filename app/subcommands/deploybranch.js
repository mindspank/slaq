const git = require('simple-git');

module.exports = (bot, msg) => {

    if (!process.env.git_repo) return bot.replyPublic(msg, 'No repository configured.')

    bot.replyPublic(msg, 'Pulling latest changes')

    git(!process.env.git_repo).pull(function(err, update) {
        if (err) return bot.replyPublic(msg, 'Could not pull from repo, error: ' + err)

        if (update && update.summary.changes) {
            bot.replyPublicDelayed(msg, `Changes: ${update.summary.changes}\nInsertions: ${update.summary.insertions}\nDeletions: ${update.summary.deletions}`);
            bot.replyPublicDelayed(msg, 'Proceeding to run npm install and bower install');

            require('child_process').exec('npm install && bower install', {cwd: process.env.git_repo}, (err, stdout, stderr) => {
                if( err ) return bot.replyPublicDelayed(msg, 'Could not run npm install and bower install');
                bot.replyPublicDelayed(msg, 'npm install && bower install finished succesfully\nBranch has been deployed :clap:')
            });

        } else {
            bot.replyPublicDelayed(msg, 'No changes, you are up to date!')
        }
    });

};