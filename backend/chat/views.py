from django.shortcuts import render

def index(request):
    return render(request, "http://localhost:5173/")

def room(request, room_name):
    return render(request, "http://localhost:5173/", {"room_name": room_name})                                                                                                                                                                                                                                                                                                                                                                                                                                                              