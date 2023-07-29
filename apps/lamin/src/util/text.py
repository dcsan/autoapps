from string import punctuation

def clean_end(line):
    line = line.split('.')[0] # in case theres a period in the first 10 words
    line = line.split(',')[0] # in case theres a period in the first 10 words
    line = line.strip()
    line = line.strip(punctuation)
    return line


# get a first line of the paragraph
# todo - break on 'and' or other natural breaks
def get_intro(line):
    words = line.split(' ')[0:10]
    intro = ' '.join(words)
    intro = clean_end(intro)
    return intro
