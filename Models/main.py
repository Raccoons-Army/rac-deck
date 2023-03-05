
# Main class, stores all the main data from config.ini

class Main:
    def __init__(self, changeMode: str, changeOnStart: bool, reset: str, end: str):
        self.changeMode = changeMode
        self.changeOnStart = changeOnStart
        self.reset = reset
        self.end = end
        
