<template>
  <div class="container-fluid mt-4">
    <div class="mb-3">
      <span class="mb-0 h2 text-primary">{{ roomName }}</span>
      <span class="ml-1" v-if="user && user.uid !== hostID">
        Hosted by: <strong class="text-danger">{{ hostDisplayName }}</strong>
      </span>
    </div>
    <div class="row" v-if="(user !== null && user.uid == hostID) || attendeeApproved">
      <div class="col-md-8">
        <vue-webrtc
          ref="webrtc"
          width="100%"
          :roomId="roomID"
          v-on:joined-room="doAttendeeJoined"
          v-on:left-room="doAttendeeLeft"
        />
      </div>
      <div class="col-md-4">
        <button
          v-if="!attendeeJoined && attendeeApproved"
          class="btn btn-primary mr-1"
          @click="doJoin"
        >
          Join
        </button>
        <button v-if="attendeeJoined" type="button" class="btn btn-danger mr-1" @click="doLeave">
          Leave
        </button>
        <h4 class="mt-2">Attendees</h4>
        <ul class="list-unstyled">
          <li v-for="attendee in attendeesApproved" :key="attendee.id">
            <a
              type="button"
              class="mr-2"
              title="Approve attendee"
              @click="toggleApproval(attendee.id)"
              v-if="user && user.uid == hostID"
            >
              <font-awesome-icon icon="user"></font-awesome-icon>
            </a>

            <span
              class="mr-2"
              :class="[attendee.webRTCID ? 'text-success' : 'text-secondary']"
              title="On Air"
            >
              <font-awesome-icon icon="podcast"></font-awesome-icon>
            </span>
            <span
              class="pl-1"
              :class="[attendee.id == user.uid ? 'font-weight-bold text-danger' : '']"
              >{{ attendee.displayName }}</span
            >
          </li>
        </ul>
        <div v-if="user && user.uid == $route.params.hostID">
          <h5 class="mt-4">Pending</h5>
          <ul class="list-unstyled">
            <li class="mb-1" v-for="attendee in attendeesPending" :key="attendee.id">
              <span>
                <a
                  type="button"
                  class="mr-2"
                  title="Approve attendee"
                  @click="toggleApproval(attendee.id)"
                >
                  <font-awesome-icon icon="user"></font-awesome-icon>
                </a>
                <a
                  type="button"
                  class="text-secondary pr-1"
                  title="Delete Attendee"
                  @click="deleteAttendee(attendee.id)"
                >
                  <font-awesome-icon icon="trash"></font-awesome-icon>
                </a>
              </span>
              <span
                class="pl-1"
                :class="[attendee.id == user.uid ? 'font-weight-bold text-danger' : '']"
                >{{ attendee.displayName }}</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="lead" v-if="user">
        Hi <strong class="text-primary font-weight-bold">{{ user.displayName }}</strong
        >, you're currently in the room waiting for the owner of the chat to add you to the meeting.
        Please wait.
      </p>
    </div>
  </div>
</template>
