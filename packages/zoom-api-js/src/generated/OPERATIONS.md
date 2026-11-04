# Operations

Generated from the Meetings API 2 OpenAPI spec; do not edit. 186 operations. Call an operation as `client.api.<tag>.<operation>(params)`, or by its request as `client.request("<METHOD> <path>", params)`.

## archiving

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.archiving.listArchivedFiles` | `GET /archive_files` | List archived files |
| `client.api.archiving.listArchiveFileDownloadAudit` | `GET /archive_files/download_audit` | List archived file download audit logs |
| `client.api.archiving.getArchivedFileStatistics` | `GET /archive_files/statistics` | Get archived file statistics |
| `client.api.archiving.updateArchivedFile` | `PATCH /archive_files/{fileId}` | Update an archived file's auto-delete status |
| `client.api.archiving.meetingLocalArchivingArchiveToken` | `GET /meetings/{meetingId}/jointoken/local_archiving` | Get a meeting's archive token for local archiving |
| `client.api.archiving.getArchivedFiles` | `GET /past_meetings/{meetingUUID}/archive_files` | Get a meeting's archived files |
| `client.api.archiving.deleteArchivedFiles` | `DELETE /past_meetings/{meetingUUID}/archive_files` | Delete a meeting's archived files |

## cloudRecording

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.cloudRecording.recordingGet` | `GET /meetings/{meetingId}/recordings` | Get meeting recordings |
| `client.api.cloudRecording.recordingDelete` | `DELETE /meetings/{meetingId}/recordings` | Delete meeting or webinar recordings |
| `client.api.cloudRecording.analyticsDetails` | `GET /meetings/{meetingId}/recordings/analytics_details` | Get a meeting or webinar recording's analytics details |
| `client.api.cloudRecording.analyticsSummary` | `GET /meetings/{meetingId}/recordings/analytics_summary` | Get a meeting or webinar recording's analytics summary |
| `client.api.cloudRecording.meetingRecordingRegistrants` | `GET /meetings/{meetingId}/recordings/registrants` | List recording registrants |
| `client.api.cloudRecording.meetingRecordingRegistrantCreate` | `POST /meetings/{meetingId}/recordings/registrants` | Create a recording registrant |
| `client.api.cloudRecording.recordingRegistrantsQuestionsGet` | `GET /meetings/{meetingId}/recordings/registrants/questions` | Get registration questions |
| `client.api.cloudRecording.recordingRegistrantQuestionUpdate` | `PATCH /meetings/{meetingId}/recordings/registrants/questions` | Update registration questions |
| `client.api.cloudRecording.meetingRecordingRegistrantStatus` | `PUT /meetings/{meetingId}/recordings/registrants/status` | Update a registrant's status |
| `client.api.cloudRecording.recordingSettingUpdate` | `GET /meetings/{meetingId}/recordings/settings` | Get meeting recording settings |
| `client.api.cloudRecording.recordingSettingsUpdate` | `PATCH /meetings/{meetingId}/recordings/settings` | Update meeting recording settings |
| `client.api.cloudRecording.recordingDeleteOne` | `DELETE /meetings/{meetingId}/recordings/{recordingId}` | Delete a recording file for a meeting or webinar |
| `client.api.cloudRecording.recordingStatusUpdateOne` | `PUT /meetings/{meetingId}/recordings/{recordingId}/status` | Recover a single recording |
| `client.api.cloudRecording.recordingStatusUpdate` | `PUT /meetings/{meetingUUID}/recordings/status` | Recover meeting recordings |
| `client.api.cloudRecording.recordingsList` | `GET /users/{userId}/recordings` | List all recordings |

## devices

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.devices.listDevices` | `GET /devices` | List devices |
| `client.api.devices.addDevice` | `POST /devices` | Add a new device |
| `client.api.devices.getzdmgroupinfo` | `GET /devices/groups` | Get ZDM group info |
| `client.api.devices.assigndevicetoauserCommonarea` | `POST /devices/zpa/assignment` | Assign a device to a user or commonarea |
| `client.api.devices.getZpaDeviceListProfileSettingOfaUser` | `GET /devices/zpa/settings` | Get Zoom Phone Appliance settings by user ID |
| `client.api.devices.upgradeZpasApp` | `POST /devices/zpa/upgrade` | Upgrade ZPA firmware or app |
| `client.api.devices.deleteZpaDeviceByVendorAndMacAddress` | `DELETE /devices/zpa/vendors/{vendor}/mac_addresses/{macAddress}` | Delete ZPA device by vendor and mac address |
| `client.api.devices.getZpaVersioninfo` | `GET /devices/zpa/zdm_groups/{zdmGroupId}/versions` | Get ZPA version info |
| `client.api.devices.getDevice` | `GET /devices/{deviceId}` | Get device detail |
| `client.api.devices.deleteDevice` | `DELETE /devices/{deviceId}` | Delete device |
| `client.api.devices.updateDevice` | `PATCH /devices/{deviceId}` | Change device |
| `client.api.devices.assginGroup` | `PATCH /devices/{deviceId}/assign_group` | Assign a device to a group |
| `client.api.devices.changeDeviceAssociation` | `PATCH /devices/{deviceId}/assignment` | Change device association |

## h323Devices

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.h323Devices.deviceList` | `GET /h323/devices` | List H.323/SIP devices |
| `client.api.h323Devices.deviceCreate` | `POST /h323/devices` | Create a H.323/SIP device |
| `client.api.h323Devices.deviceDelete` | `DELETE /h323/devices/{deviceId}` | Delete a H.323/SIP device |
| `client.api.h323Devices.deviceUpdate` | `PATCH /h323/devices/{deviceId}` | Update a H.323/SIP device |

## inMeetingApps

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.inMeetingApps.meetingAppAdd` | `POST /meetings/{meetingId}/open_apps` | Add a meeting app |
| `client.api.inMeetingApps.meetingAppDelete` | `DELETE /meetings/{meetingId}/open_apps` | Delete a meeting app |

## inMeetingFeatures

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.inMeetingFeatures.deleteMeetingChatMessageById` | `DELETE /live_meetings/{meetingId}/chat/messages/{messageId}` | Delete a live meeting message |
| `client.api.inMeetingFeatures.updateMeetingChatMessageById` | `PATCH /live_meetings/{meetingId}/chat/messages/{messageId}` | Update a live meeting message |
| `client.api.inMeetingFeatures.inMeetingControl` | `PATCH /live_meetings/{meetingId}/events` | In-meeting controls |
| `client.api.inMeetingFeatures.meetingLocalRecordingJoinToken` | `GET /meetings/{meetingId}/jointoken/local_recording` | Get a meeting's join token for local recording |
| `client.api.inMeetingFeatures.meetingToken` | `GET /meetings/{meetingId}/token` | Get meeting's token |

## invitationRegistration

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.invitationRegistration.addBatchRegistrants` | `POST /meetings/{meetingId}/batch_registrants` | Perform batch registration |
| `client.api.invitationRegistration.meetingInvitation` | `GET /meetings/{meetingId}/invitation` | Get meeting invitation |
| `client.api.invitationRegistration.meetingInviteLinksCreate` | `POST /meetings/{meetingId}/invite_links` | Create a meeting's invite links |
| `client.api.invitationRegistration.meetingRegistrants` | `GET /meetings/{meetingId}/registrants` | List meeting registrants |
| `client.api.invitationRegistration.meetingRegistrantCreate` | `POST /meetings/{meetingId}/registrants` | Add a meeting registrant |
| `client.api.invitationRegistration.meetingRegistrantsQuestionsGet` | `GET /meetings/{meetingId}/registrants/questions` | List registration questions |
| `client.api.invitationRegistration.meetingRegistrantQuestionUpdate` | `PATCH /meetings/{meetingId}/registrants/questions` | Update registration questions |
| `client.api.invitationRegistration.meetingRegistrantStatus` | `PUT /meetings/{meetingId}/registrants/status` | Update registrant's status |
| `client.api.invitationRegistration.meetingRegistrantGet` | `GET /meetings/{meetingId}/registrants/{registrantId}` | Get a meeting registrant |
| `client.api.invitationRegistration.meetingregistrantdelete` | `DELETE /meetings/{meetingId}/registrants/{registrantId}` | Delete a meeting registrant |

## liveStreaming

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.liveStreaming.meetingLiveStreamingJoinToken` | `GET /meetings/{meetingId}/jointoken/live_streaming` | Get a meeting's join token for live streaming |
| `client.api.liveStreaming.getMeetingLiveStreamDetails` | `GET /meetings/{meetingId}/livestream` | Get livestream details |
| `client.api.liveStreaming.meetingLiveStreamUpdate` | `PATCH /meetings/{meetingId}/livestream` | Update a livestream |
| `client.api.liveStreaming.meetingLiveStreamStatusUpdate` | `PATCH /meetings/{meetingId}/livestream/status` | Update livestream status |

## meetingTranscript

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.meetingTranscript.getMeetingTranscript` | `GET /meetings/{meetingId}/transcript` | Get a meeting transcript |
| `client.api.meetingTranscript.deleteMeetingTranscript` | `DELETE /meetings/{meetingId}/transcript` | Delete a meeting or webinar transcript |

## meetings

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.meetings.meetingRTMSStatusUpdate` | `PATCH /live_meetings/{meetingId}/rtms_app/status` | Update participant Real-Time Media Streams (RTMS) app status |
| `client.api.meetings.meeting` | `GET /meetings/{meetingId}` | Get a meeting |
| `client.api.meetings.meetingDelete` | `DELETE /meetings/{meetingId}` | Delete a meeting |
| `client.api.meetings.meetingUpdate` | `PATCH /meetings/{meetingId}` | Update a meeting |
| `client.api.meetings.getSipDialingWithPasscode` | `POST /meetings/{meetingId}/sip_dialing` | Get a meeting SIP URI with passcode |
| `client.api.meetings.meetingStatus` | `PUT /meetings/{meetingId}/status` | Update meeting status |
| `client.api.meetings.pastMeetingDetails` | `GET /past_meetings/{meetingId}` | Get past meeting details |
| `client.api.meetings.pastMeetings` | `GET /past_meetings/{meetingId}/instances` | List past meeting instances |
| `client.api.meetings.pastMeetingParticipants` | `GET /past_meetings/{meetingId}/participants` | Get past meeting participants |
| `client.api.meetings.listPastMeetingQA` | `GET /past_meetings/{meetingId}/qa` | List past meetings' Q&A |
| `client.api.meetings.meetings` | `GET /users/{userId}/meetings` | List meetings |
| `client.api.meetings.meetingCreate` | `POST /users/{userId}/meetings` | Create a meeting |
| `client.api.meetings.listUpcomingMeeting` | `GET /users/{userId}/upcoming_meetings` | List upcoming meetings |

## pac

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.pac.userPACs` | `GET /users/{userId}/pac` | List a user's PAC accounts |

## polls

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.polls.createBatchPolls` | `POST /meetings/{meetingId}/batch_polls` | Perform batch poll creation |
| `client.api.polls.meetingPolls` | `GET /meetings/{meetingId}/polls` | List meeting polls |
| `client.api.polls.meetingPollCreate` | `POST /meetings/{meetingId}/polls` | Create a meeting poll |
| `client.api.polls.meetingPollGet` | `GET /meetings/{meetingId}/polls/{pollId}` | Get a meeting poll |
| `client.api.polls.meetingPollUpdate` | `PUT /meetings/{meetingId}/polls/{pollId}` | Update a meeting poll |
| `client.api.polls.meetingPollDelete` | `DELETE /meetings/{meetingId}/polls/{pollId}` | Delete a meeting poll |
| `client.api.polls.listPastMeetingPolls` | `GET /past_meetings/{meetingId}/polls` | List past meeting's poll results |

## reports

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.reports.reportSignInSignOutActivities` | `GET /report/activities` | Get sign In / sign out activity report |
| `client.api.reports.getBillingReport` | `GET /report/billing` | Get billing reports |
| `client.api.reports.getBillingInvoicesReports` | `GET /report/billing/invoices` | Get billing invoice reports |
| `client.api.reports.reportCloudRecording` | `GET /report/cloud_recording` | Get cloud recording usage report |
| `client.api.reports.reportDaily` | `GET /report/daily` | Get daily usage report |
| `client.api.reports.getdisclaimerreport` | `GET /report/disclaimer` | Get disclaimer report |
| `client.api.reports.gethistorymeetingandwebinarlist` | `GET /report/history_meetings` | Get history meeting and webinar list |
| `client.api.reports.reportMeetingactivitylogs` | `GET /report/meeting_activities` | Get a meeting activities report |
| `client.api.reports.reportMeetingDetails` | `GET /report/meetings/{meetingId}` | Get meeting detail reports |
| `client.api.reports.reportMeetingParticipants` | `GET /report/meetings/{meetingId}/participants` | Get meeting participant reports |
| `client.api.reports.reportMeetingPolls` | `GET /report/meetings/{meetingId}/polls` | Get meeting poll reports |
| `client.api.reports.reportMeetingQA` | `GET /report/meetings/{meetingId}/qa` | Get meeting Q&A report |
| `client.api.reports.reportMeetingSurvey` | `GET /report/meetings/{meetingId}/survey` | Get meeting survey report |
| `client.api.reports.reportOperationLogs` | `GET /report/operationlogs` | Get operation logs report |
| `client.api.reports.getremotesupportreport` | `GET /report/remote_support` | Get remote support report |
| `client.api.reports.reportTelephone` | `GET /report/telephone` | Get telephone reports |
| `client.api.reports.reportUpcomingEvents` | `GET /report/upcoming_events` | Get upcoming events report |
| `client.api.reports.reportUsers` | `GET /report/users` | Get active or inactive host reports |
| `client.api.reports.reportMeetings` | `GET /report/users/{userId}/meetings` | Get meeting reports |
| `client.api.reports.reportWebinarDetails` | `GET /report/webinars/{webinarId}` | Get webinar detail reports |
| `client.api.reports.reportWebinarParticipants` | `GET /report/webinars/{webinarId}/participants` | Get webinar participant reports |
| `client.api.reports.reportWebinarPolls` | `GET /report/webinars/{webinarId}/polls` | Get webinar poll reports |
| `client.api.reports.reportWebinarQA` | `GET /report/webinars/{webinarId}/qa` | Get webinar Q&A report |
| `client.api.reports.reportWebinarSurvey` | `GET /report/webinars/{webinarId}/survey` | Get webinar survey report |

## sipPhone

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.sipPhone.listSIPPhonePhones` | `GET /sip_phones/phones` | List SIP phones |
| `client.api.sipPhone.enableSIPPhonePhones` | `POST /sip_phones/phones` | Enable SIP phone |
| `client.api.sipPhone.deleteSIPPhonePhones` | `DELETE /sip_phones/phones/{phoneId}` | Delete SIP phone |
| `client.api.sipPhone.updateSIPPhonePhones` | `PATCH /sip_phones/phones/{phoneId}` | Update SIP phone |

## summaries

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.summaries.listmeetingsummaries` | `GET /meetings/meeting_summaries` | List an account's meeting or webinar summaries |
| `client.api.summaries.getameetingsummary` | `GET /meetings/{meetingId}/meeting_summary` | Get a meeting or webinar summary |
| `client.api.summaries.deletemeetingorwebinarsummary` | `DELETE /meetings/{meetingId}/meeting_summary` | Delete a meeting or webinar summary |
| `client.api.summaries.listUserMeetingSummaries` | `GET /users/{userId}/meeting_summaries` | List a user's meeting or webinar summaries |

## surveys

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.surveys.meetingSurveyGet` | `GET /meetings/{meetingId}/survey` | Get a meeting survey |
| `client.api.surveys.meetingSurveyDelete` | `DELETE /meetings/{meetingId}/survey` | Delete a meeting survey |
| `client.api.surveys.meetingSurveyUpdate` | `PATCH /meetings/{meetingId}/survey` | Update a meeting survey |

## tsp

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.tsp.tsp` | `GET /tsp` | Get account's TSP information |
| `client.api.tsp.tspUpdate` | `PATCH /tsp` | Update an account's TSP information |
| `client.api.tsp.userTSPs` | `GET /users/{userId}/tsp` | List user's TSP accounts |
| `client.api.tsp.userTSPCreate` | `POST /users/{userId}/tsp` | Add a user's TSP account |
| `client.api.tsp.tspUrlUpdate` | `PATCH /users/{userId}/tsp/settings` | Set global dial-in URL for a TSP user |
| `client.api.tsp.userTSP` | `GET /users/{userId}/tsp/{tspId}` | Get a user's TSP account |
| `client.api.tsp.userTSPDelete` | `DELETE /users/{userId}/tsp/{tspId}` | Delete a user's TSP account |
| `client.api.tsp.userTSPUpdate` | `PATCH /users/{userId}/tsp/{tspId}` | Update a TSP account |

## templates

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.templates.listMeetingTemplates` | `GET /users/{userId}/meeting_templates` | List meeting templates |
| `client.api.templates.meetingTemplateCreate` | `POST /users/{userId}/meeting_templates` | Create a meeting template from an existing meeting |

## trackingField

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.trackingField.trackingfieldList` | `GET /tracking_fields` | List tracking fields |
| `client.api.trackingField.trackingfieldCreate` | `POST /tracking_fields` | Create a tracking field |
| `client.api.trackingField.trackingfieldGet` | `GET /tracking_fields/{fieldId}` | Get a tracking field |
| `client.api.trackingField.trackingfieldDelete` | `DELETE /tracking_fields/{fieldId}` | Delete a tracking field |
| `client.api.trackingField.trackingfieldUpdate` | `PATCH /tracking_fields/{fieldId}` | Update a tracking field |

## webinars

| Call | Request | Summary |
| --- | --- | --- |
| `client.api.webinars.deleteWebinarChatMessageById` | `DELETE /live_webinars/{webinarId}/chat/messages/{messageId}` | Delete a live webinar message |
| `client.api.webinars.webinarAbsentees` | `GET /past_webinars/{webinarId}/absentees` | Get webinar absentees |
| `client.api.webinars.pastWebinars` | `GET /past_webinars/{webinarId}/instances` | List past webinar instances |
| `client.api.webinars.listWebinarParticipants` | `GET /past_webinars/{webinarId}/participants` | List webinar participants |
| `client.api.webinars.listPastWebinarPollResults` | `GET /past_webinars/{webinarId}/polls` | List past webinar poll results |
| `client.api.webinars.listPastWebinarQA` | `GET /past_webinars/{webinarId}/qa` | List Q&As of a past webinar |
| `client.api.webinars.listWebinarTemplates` | `GET /users/{userId}/webinar_templates` | List webinar templates |
| `client.api.webinars.webinarTemplateCreate` | `POST /users/{userId}/webinar_templates` | Create a webinar template |
| `client.api.webinars.webinars` | `GET /users/{userId}/webinars` | List webinars |
| `client.api.webinars.webinarCreate` | `POST /users/{userId}/webinars` | Create a webinar |
| `client.api.webinars.webinar` | `GET /webinars/{webinarId}` | Get a webinar |
| `client.api.webinars.webinarDelete` | `DELETE /webinars/{webinarId}` | Delete a webinar |
| `client.api.webinars.webinarUpdate` | `PATCH /webinars/{webinarId}` | Update a webinar |
| `client.api.webinars.addBatchWebinarRegistrants` | `POST /webinars/{webinarId}/batch_registrants` | Perform batch registration |
| `client.api.webinars.getWebinarBranding` | `GET /webinars/{webinarId}/branding` | Get webinar's session branding |
| `client.api.webinars.createWebinarBrandingNameTag` | `POST /webinars/{webinarId}/branding/name_tags` | Create a webinar's branding name tag |
| `client.api.webinars.deleteWebinarBrandingNameTag` | `DELETE /webinars/{webinarId}/branding/name_tags` | Delete a webinar's branding name tag |
| `client.api.webinars.updateWebinarBrandingNameTag` | `PATCH /webinars/{webinarId}/branding/name_tags/{nameTagId}` | Update a webinar's branding name tag |
| `client.api.webinars.uploadWebinarBrandingVB` | `POST /webinars/{webinarId}/branding/virtual_backgrounds` | Upload a webinar's branding virtual background |
| `client.api.webinars.deleteWebinarBrandingVB` | `DELETE /webinars/{webinarId}/branding/virtual_backgrounds` | Delete a webinar's branding virtual backgrounds |
| `client.api.webinars.setWebinarBrandingVB` | `PATCH /webinars/{webinarId}/branding/virtual_backgrounds` | Set webinar's default branding virtual background |
| `client.api.webinars.uploadWebinarBrandingWallpaper` | `POST /webinars/{webinarId}/branding/wallpaper` | Upload a webinar's branding wallpaper |
| `client.api.webinars.deleteWebinarBrandingWallpaper` | `DELETE /webinars/{webinarId}/branding/wallpaper` | Delete a webinar's branding wallpaper |
| `client.api.webinars.webinarInviteLinksCreate` | `POST /webinars/{webinarId}/invite_links` | Create webinar's invite links |
| `client.api.webinars.webinarLiveStreamingJoinToken` | `GET /webinars/{webinarId}/jointoken/live_streaming` | Get a webinar's join token for live streaming |
| `client.api.webinars.webinarLocalArchivingArchiveToken` | `GET /webinars/{webinarId}/jointoken/local_archiving` | Get a webinar's archive token for local archiving |
| `client.api.webinars.webinarLocalRecordingJoinToken` | `GET /webinars/{webinarId}/jointoken/local_recording` | Get a webinar's join token for local recording |
| `client.api.webinars.getWebinarLiveStreamDetails` | `GET /webinars/{webinarId}/livestream` | Get live stream details |
| `client.api.webinars.webinarLiveStreamUpdate` | `PATCH /webinars/{webinarId}/livestream` | Update a live stream |
| `client.api.webinars.webinarLiveStreamStatusUpdate` | `PATCH /webinars/{webinarId}/livestream/status` | Update live stream status |
| `client.api.webinars.webinarPanelists` | `GET /webinars/{webinarId}/panelists` | List panelists |
| `client.api.webinars.webinarPanelistCreate` | `POST /webinars/{webinarId}/panelists` | Add panelists |
| `client.api.webinars.webinarPanelistsDelete` | `DELETE /webinars/{webinarId}/panelists` | Remove all panelists |
| `client.api.webinars.webinarPanelistDelete` | `DELETE /webinars/{webinarId}/panelists/{panelistId}` | Remove a panelist |
| `client.api.webinars.webinarPolls` | `GET /webinars/{webinarId}/polls` | List a webinar's polls |
| `client.api.webinars.webinarPollCreate` | `POST /webinars/{webinarId}/polls` | Create a webinar's poll |
| `client.api.webinars.webinarPollGet` | `GET /webinars/{webinarId}/polls/{pollId}` | Get a webinar poll |
| `client.api.webinars.webinarPollUpdate` | `PUT /webinars/{webinarId}/polls/{pollId}` | Update a webinar poll |
| `client.api.webinars.webinarPollDelete` | `DELETE /webinars/{webinarId}/polls/{pollId}` | Delete a webinar poll |
| `client.api.webinars.webinarRegistrants` | `GET /webinars/{webinarId}/registrants` | List webinar registrants |
| `client.api.webinars.webinarRegistrantCreate` | `POST /webinars/{webinarId}/registrants` | Add a webinar registrant |
| `client.api.webinars.webinarRegistrantsQuestionsGet` | `GET /webinars/{webinarId}/registrants/questions` | List registration questions |
| `client.api.webinars.webinarRegistrantQuestionUpdate` | `PATCH /webinars/{webinarId}/registrants/questions` | Update registration questions |
| `client.api.webinars.webinarRegistrantStatus` | `PUT /webinars/{webinarId}/registrants/status` | Update registrant's status |
| `client.api.webinars.webinarRegistrantGet` | `GET /webinars/{webinarId}/registrants/{registrantId}` | Get a webinar registrant |
| `client.api.webinars.deleteWebinarRegistrant` | `DELETE /webinars/{webinarId}/registrants/{registrantId}` | Delete a webinar registrant |
| `client.api.webinars.getWebinarSipDialingWithPasscode` | `POST /webinars/{webinarId}/sip_dialing` | Get a webinar SIP URI with passcode |
| `client.api.webinars.webinarStatus` | `PUT /webinars/{webinarId}/status` | Update webinar status |
| `client.api.webinars.webinarSurveyGet` | `GET /webinars/{webinarId}/survey` | Get a webinar survey |
| `client.api.webinars.webinarSurveyDelete` | `DELETE /webinars/{webinarId}/survey` | Delete a webinar survey |
| `client.api.webinars.webinarSurveyUpdate` | `PATCH /webinars/{webinarId}/survey` | Update a webinar survey |
| `client.api.webinars.webinarToken` | `GET /webinars/{webinarId}/token` | Get webinar's token |
| `client.api.webinars.getTrackingSources` | `GET /webinars/{webinarId}/tracking_sources` | Get webinar tracking sources |
