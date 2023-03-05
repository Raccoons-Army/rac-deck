# Main class, stores all the nick data from config.ini and its functions
class Nick:

    """
    userId: user id
    changeOnAllServers: defines if the user's nick is be changed in all server
    defaultNick: user's default nick
    data: data to be mapped into hotkeys
    """

    def __init__(self, userId, changeOnAllServers: bool, defaultNicks: dict, data: dict):
        self.userId = userId
        self.changeOnAllServers = changeOnAllServers
        self.defaultNicks = defaultNicks
        self.data = data
