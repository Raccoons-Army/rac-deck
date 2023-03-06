# Nick class, stores all the nick data from config.ini
class Nick:

    """
    userId: user id
    changeOnAllServers: defines if the user's nick is be changed in all server
    defaultNick: user's default nick
    data: data to be mapped into hotkeys
    """

    def __init__(self, userId, changeOnAllServers: bool, data: dict):
        self.userId = userId
        self.changeOnAllServers = changeOnAllServers
        self.data = data
