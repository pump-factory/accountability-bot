ALTER TABLE
	"User"
ADD
	COLUMN "timezone" TEXT DEFAULT 'America/New_York';

ALTER TABLE
	"HabitEvent"
ADD
	COLUMN "loggedAtUserTz" TIMESTAMPTZ;
