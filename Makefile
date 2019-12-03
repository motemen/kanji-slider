public/data.tsv:
	pipenv run unihan-etl -f kTotalStrokes kJis0 -d /dev/stdout \
	    | perl -pe 's/\r\n/\n/g' \
	    | perl -F, -anle 'print "$$F[2]\t$$F[0]" if $$F[3]' \
	    | sort -n > $@
