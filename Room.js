/** Chat rooms that can be joined/left/broadcast to. */

// in-memory storage of roomIds -> room

const ROOMS = new Map();

/** Room is a collection of listening members; this becomes a "chat room"
 *   where individual users can join/leave/broadcast to.
 */

class Room {
  /** get room by that name, creating if nonexistent
   *
   * This uses a programming pattern often called a "registry" ---
   * users of this class only need to .get to find a room; they don't
   * need to know about the ROOMS variable that holds the rooms. To
   * them, the Room class manages all of this stuff for them.
   **/

  static get(roomId) {
    if (!ROOMS.has(roomId)) {
      ROOMS.set(roomId, new Room(roomId));
    }

    return ROOMS.get(roomId);
  }

  /** make a new room, starting with empty set of listeners */

  constructor(roomId) {
    this.id = roomId;
    this.members = new Set();
    this.videos = new Set();
    this.currentVideoId = null;
    this.currentVideoTime = null;
    this.currentVideoState = null;
  }

  close(id) {
    if (this.members.size === 0) {
      ROOMS.delete(id);
    }
  }
  /** member joining a room. */

  join(member) {
    this.members.add(member);
  }

  /** member leaving a room. */

  leave(member) {
    this.members.delete(member);
  }

  /** add video to queue. */

  add(video) {
    this.videos.add(video);
  }
  /** add video to queue. */

  remove(video) {
    this.videos.forEach((queue) => {
      if (queue.videoId === video.videoId) {
        this.videos.delete(queue);
      };
    });
  }

  getVideos() {
    if (this.videos && this.videos !== undefined) {
      return this.videos;
    } else {
      return null;
    }
  };

  setCurrentVideoId(videoId) {
    this.currentVideoId = videoId;
  };

  getCurrentVideoId() {
    if (this.currentVideoId && this.currentVideoId !== null) {
      return this.currentVideoId;
    } else {
      return null;
    }
  };

  setCurrentVideoTime(videoTime) {
    this.currentVideoTime = videoTime;
  };

  getCurrentVideoTime() {
    if (this.currentVideoTime && this.currentVideoTime !== null) {
      return this.currentVideoTime;
    } else {
      return null;
    }
  };

  setCurrentVideoState(videoState) {
    this.currentVideoState = videoState;
  };

  getCurrentVideoState() {
    if (this.currentVideoState && this.currentVideoState !== null) {
      return this.currentVideoState;
    } else {
      return null;
    }
  };

  // /** send message to all members in a room. */

  broadcast(data) {
    // console.debug(data);
    for (let member of this.members) {
      member.send(JSON.stringify(data));
    }
  }

  /** send message to all members in a room. */
  // exclude self
  broadcastExclusive(data) {
    for (let member of this.members) {
      if (member.username !== data.username) {
        // console.debug('sent to: ', member.username, data);
        member.send(JSON.stringify(data));
      }
    }
  }

  broadcastSelf(data) {
    for (let member of this.members) {
      if (member.username === data.username) {
        // console.debug(data);
        member.send(JSON.stringify(data));
      }
    }
  }
}

module.exports = Room;
