from git import Repo
from tkinter import filedialog as fd


# BASE_PATH = 'C:/Users/Hyoseo/Documents/Programming/hyoseo837.github.io'

def git_push(date,base_path):
    PATH_OF_GIT_REPO = base_path+'/.git'  # make sure .git folder is properly configured
    JSON_PATH = base_path+'/notepad/blogData.json'
    COMMIT_MESSAGE = f'{date} blog post (committed by script)'
    HTML_PATH = base_path+ "/notepad/texts/"+date+".html"
    
    repo = Repo(PATH_OF_GIT_REPO)
    repo.git.add([JSON_PATH,HTML_PATH])
    repo.index.commit(COMMIT_MESSAGE)
    origin = repo.remote(name='origin')
    origin.push()
