
# Main class, stores all the channel data from config.ini and its functions
class Channel:
    """
    serverId: server id where the channels are
    data: hotkeys that changes the channels' name
    """

    def __init__(self, serverId: int, data: dict):
        self.serverId = serverId
        self.data = data
